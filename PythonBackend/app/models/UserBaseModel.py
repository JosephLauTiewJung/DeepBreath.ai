from pydantic import BaseModel
class UserBaseModel(BaseModel):
    userId: str
    xray: bytes
    report: bytes
    annotatedXray: bytes
    evaluatedReport: bytes