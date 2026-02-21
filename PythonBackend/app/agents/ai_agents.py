import os
import pathlib
from ..models.ResponseBaseModel import ResponseBaseModel
from dotenv import load_dotenv
from google.genai import Client, types
from ..models.CriticalLevelIndicator import CRITICAL_LEVEL
import requests
from ..models.FindDoctorResponseBaseModel import FindDoctorResponseBaseModel

load_dotenv()
api_key:str = os.getenv("GEMINI_API_KEY")
client: Client = Client(api_key=api_key)
BASE_DIR = pathlib.Path(__file__).resolve().parent.parent.parent

def summarise_report(report) -> str:
    print("Summarising report...")
    system_instruction: str = "You are a helpful assistant that summarises health reports of patients."
    report_summarization = client.models.generate_content(
        model="gemini-3-flash-preview",
        config= types.GenerateContentConfig(
            system_instruction=system_instruction
        ),
        contents=[report, "Summarize this document"])
    return report_summarization.text

def summarize_report_with_evaluation(report_summarization:str, user_id: str) :
    print("create evaluation....")
    system_instruction: str =f"""You are a helpful assistant that evaluates the health report summary and gives 
    recommendations for the patient. The report summarization is as follows: {report_summarization}. You should give 
    explanations for your evaluations and recommendations. You are provided with a critical level indicator that ranges 
    from 0 to 10, where 0 indicates no criticality and 10 indicates extreme criticality. The critical level indicator is
     defined as follows: {CRITICAL_LEVEL}. Your answers need to be patient-friendly and easy to understand. Don't use 
too much of medical jargon. For example, "Your X-ray shows a small shadow in the lower right lung. It might be an
 infection. I've already found a clinic in the next town that has an opening tomorrow."""
    user_info = requests.get("http://localhost:8080/getUser", params={
        "userId" : user_id
    })
    print(user_info)
    evaluation_and_recommendations = client.models.generate_content(
        model="gemini-3-flash-preview",
        config= types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            response_json_schema=ResponseBaseModel.model_json_schema()
        ),
        contents=["Evaluate the health status based on the summary provided in the system instructions."])
    return ResponseBaseModel.model_validate_json(evaluation_and_recommendations.text)

def generate_doctor_report(report_summarization: str):
    draft_path = BASE_DIR / "app" / "draft" / "ReportDraft.txt"
    with open(draft_path, "r") as f:
        draft = f.read()
        system_instruction: str = f"""You are a helpful assistant that generates a doctor's report based on the provided
         draft. The draft is as follows: {draft}. Generate the report in markdown format."""
        doctor_report = client.models.generate_content(
            config=types.GenerateContentConfig(
                system_instruction=system_instruction
            ),
            model="gemini-3-flash-preview",
            contents=[report_summarization, "Generate a comprehensive report. You need to highlight the important findings"]
        )
        return doctor_report.text

def find_nearby_doctor(doctor_report: str, user_location: str):
    result = client.models.generate_content(
        config=types.GenerateContentConfig(
            tools=[types.Tool(google_maps=types.GoogleMaps())],
        ),
        model="gemini-2.5-flash",
        contents=f"""This is the doctor report: {doctor_report}. Based on the report, find the nearest specialist 
        doctor that can help the patient. This is the user location: {user_location}."""
    )
    json_result = client.models.generate_content(
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_json_schema=FindDoctorResponseBaseModel.model_json_schema(),
            tools=[types.Tool(google_search=types.GoogleSearch())]
        ),
        model="gemini-3-flash-preview",
        contents=[result.text, "You need to find at least 5 doctors that are relevant to the patient's condition."]
    )
    return FindDoctorResponseBaseModel.model_validate_json(json_result.text)
