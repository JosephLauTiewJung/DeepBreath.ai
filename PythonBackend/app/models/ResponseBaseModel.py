from pydantic import BaseModel, Field


class ResponseBaseModel(BaseModel):
    criticalLevel: int = Field(ge=0, le=10, description="Critical level")
    message: str = Field(..., description="explanation of the tumor location, size and type")
    evaluation: str = Field(..., description="Your evaluation of the patient's health condition")
    recommendations: str = Field(..., description="Your recommendations for the patient based on the evaluation for the further actions")