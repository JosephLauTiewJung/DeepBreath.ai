# Kitahack 2026
## Project Name: Med Vision
### Group name: abc
### Team Members: Joseph Lau Tiew Jung
____
## Overview
An AI-driven triage and reporting system designed for Malaysian clinics that lack on-site professional radiologists. This solution automates X-ray analysis, evaluates critical levels, and generates editable medical reports to reduce patient bottlenecks and assist medical staff.

**SDG Alignment:** SDG 3: Good Health and Well-being

## Features
* **Automated X-Ray Analysis:** YOLO detects and highlights potential tumors.
* **Smart Triage & Reporting:** The Gemini API acts as an AI radiologist, evaluating visual data and text reports to classify criticality (Low/Medium/High) and generating editable, downloadable summaries.
* **Emergency Routing:** Integrates the Google Maps API to immediately locate and route high-risk patients to the nearest specialist hospital.
* **Secure Storage:** Firebase manages the secure storage and retrieval of patient X-rays and reports.

## Tech Stack
* **Frontend:** React.js
* **Backend:** Spring Boot (Core logic/Routing), FastAPI (AI/Model serving)
* **AI Models:** Gemini API (Text/Context analysis), YOLO (Tumor detection)
* **API Services** Google Map API (Find relevant specialist), Firebase authentication (user registration and login)
* ** Database** FireStore (store user informations)

## Technical Architecture & Implementation
The system utilizes a microservices architecture. The React frontend securely uploads X-rays to Firebase. 
The FastAPI backend handles the YOLO object detection and constructs a JSON payload containing bounding boxes 
and patient data. This payload is sent to the Gemini API for final evaluation and report generation. 
Spring Boot handles most of the business logic, such as storing user data, sending data to python backend server side for AI operations.

## Innovation & Challenges Faced
* **Innovation:** Combining computer vision (YOLO) with LLM reasoning (Gemini) to create a comprehensive, context-aware medical evaluation pipeline, bridging the gap between basic clinics and specialized care. YOLO is used because it is extremely light-weight and fast, which save the compute resources for GEMINI LLM complex agentic workflow.
* **Challenges:** Integrating asynchronous Python-based AI microservices (FastAPI) with a robust Java backend (Spring Boot) while ensuring low-latency responses for real-time clinic use. Resolved by establishing strict JSON contracts and optimizing API calls.

## Setup Instructions
This setup instructions is for those who are using windows command prompt. For the Mac and Linux users please search for the instructions online.
### Prerequisites
* Node.js & npm
* Python 3.9+
* Java 17+ & Maven
* API Keys: Gemini API, Google Maps API, Firebase Configuration

### 1. Setup API Key 
1. Navigate to frontend/.env VITE_GOOGLE_MAP_API_KEY={YOUR_GOOGLE_MAP_API_KEY}
2. Navigate to PythonBackend/, copy and paste your 
### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### 3. AI Service (FastAPI)
```bash
cd PythonBackend
python -m venv venv # create a virtual environment  
.\venv\Scripts\activate # activate virtual environment
pip install -r requirements.txt
uvicorn app.main:app --reload
```
*(Ensure YOLO weights(best.pt) are placed in the `/models` directory)*

### 4. Core Backend (Spring Boot)
```bash
cd SpringBootBackend
mvn spring-boot:run # start with maven / mvnd if maven daemon
```
*(Configure your application.properties with the necessary Firebase and Google Maps credentials)*