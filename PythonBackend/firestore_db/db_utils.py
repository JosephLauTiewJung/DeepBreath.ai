import firebase_admin
from firebase_admin import firestore, credentials
from pathlib import Path
# Application Default credentials are automatically created.
BASE_DIR = Path(__file__).resolve().parent.parent
file_path = BASE_DIR / 'config.json'
cred = credentials.Certificate(file_path)
app = firebase_admin.initialize_app(cred)
db = firestore.client()
collection = db.collection("users")
# Use a service account.

db = firestore.client()
def get_user_data(user_id:str):
    doc = collection.document(user_id).get()
    return doc.to_dict()