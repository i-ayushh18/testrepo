from __future__ import annotations

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = Field(..., description="Service status", examples=["ok"])
    env: str = Field(..., description="Current environment", examples=["development"])
    version: str = Field(..., description="Application version", examples=["1.0.0"])