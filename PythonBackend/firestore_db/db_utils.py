import firebase_admin
from firebase_admin import firestore, credentials
# Application Default credentials are automatically created.
cred = credentials.Certificate(r'C:\Users\josep\Desktop\breast_tumor_detection\med-vision-dd803-firebase-adminsdk-fbsvc-b2d1e45f07.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()
collection = db.collection("users")
# Use a service account.

db = firestore.client()
def get_user_data(user_id:str):
    doc = collection.document(user_id).get()
    return doc.to_dict()