import json
from pathlib import Path
import numpy
from PIL.ImageFile import ImageFile
from fastapi import FastAPI, Request
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from ultralytics import YOLO
from ultralytics.engine.results import Results
from .agents.ai_agents import find_nearby_doctor, summarise_report, summarize_report_with_evaluation, generate_doctor_report
from .models.ResponseBaseModel import ResponseBaseModel
from pypdf import PdfReader
from PIL import Image
import io
from .models.FindDoctorRequestBaseModel import FindDoctorRequestBaseModel, Location
import numpy as np
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "yolo_model" / "best.pt"

model = YOLO(MODEL_PATH)
def convert_bytes_to_image_array(image_bytes: bytes) -> np.ndarray:
    img:ImageFile  = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_np:np.ndarray = np.array(img)
    return img_np

def tumor_detection(xray):
    results = model(xray)
    return results

@app.post("/analyzeXray")
async def plot_result(request: Request):
    xray = await request.body()
    # identify tumor in xray
    xray_array:np.ndarray = convert_bytes_to_image_array(xray)
    result: list[Results] = model(xray_array)
    plotted_result: numpy.ndarray = result[0].plot()
    plotted_result_rgb = plotted_result[..., ::-1]  # Flip Blue/Red channels
    # return to java as image
    buffer = io.BytesIO()
    Image.fromarray(plotted_result_rgb).save(buffer, format="png")
    return Response(content=buffer.getvalue(), media_type="image/png")

@app.post("/analyzeAndEvaluateReport")
async def predict_result(request: Request, userId: str):
    report = await request.body()
    reader = PdfReader(io.BytesIO(report))
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    print(text)
    summary:str = summarise_report(text)
    # ai flow to determine if tumor is benign or malignant, give evaluations and recommendations
    evaluation_and_recommendations:ResponseBaseModel = summarize_report_with_evaluation(summary, user_id=userId)
    # return the evaluations to java as json
    return evaluation_and_recommendations
@app.get("/test")
async def test(body: ResponseBaseModel):
    return body

@app.post("/doctorReport")
async def get_doctor_report(evaluatedReport: ResponseBaseModel):
    doctor_report = generate_doctor_report(evaluatedReport.model_dump_json())
    return doctor_report

@app.post("/findDoctor")
async def find_doctor(request: FindDoctorRequestBaseModel):
    doctor_report: str = request.doctor_report
    print("doctor report: " + doctor_report)
    user_location: Location = request.user_location
    print("user_location: " + user_location.model_dump_json())
    return find_nearby_doctor(doctor_report, user_location.model_dump_json())