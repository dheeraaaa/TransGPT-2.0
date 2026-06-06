from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.translate import router as translate_router

app = FastAPI(title="TransGPT 2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translate_router)

@app.get("/")
def home():
    return {"message": "TransGPT 2.0 Backend Running"}