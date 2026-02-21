from pydantic import BaseModel
class Location(BaseModel):
    latitude: float
    longitude: float
class FindDoctorRequestBaseModel(BaseModel):
    doctor_report: str
    user_location: Location