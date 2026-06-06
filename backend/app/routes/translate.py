from fastapi import APIRouter
from pydantic import BaseModel
from app.services.translator import translate_text

router = APIRouter()

class TranslateRequest(BaseModel):
    text: str
    source: str
    target: str

@router.post("/translate")
def translate(request: TranslateRequest):
    translated = translate_text(
        request.text,
        request.source,
        request.target
    )

    return {
        "translated": translated
    }