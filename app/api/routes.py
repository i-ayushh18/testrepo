from __future__ import annotations

from typing import Dict

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.models.schemas import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    return HealthResponse(status="ok", env=settings.app_env, version="1.0.0")


@router.get("/error-example", tags=["system"])
def error_example(raise_error: bool = False) -> JSONResponse:
    if raise_error:
        # Demonstrate proper error handling with explicit HTTPException.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This is an intentional example error.",
        )
    return JSONResponse({"message": "No error raised."})