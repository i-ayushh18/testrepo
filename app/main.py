from __future__ import annotations

import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.api.routes import router
from app.core.config import settings

# Configure basic logging. In production, prefer structlog or a centralized logger.
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("app")


def create_app() -> FastAPI:
    app = FastAPI(
        title="Project Name",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Routers
    app.include_router(router)

    # Global exception handler for unexpected errors
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.exception("Unhandled error: %s %s", request.method, request.url)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error"},
        )

    @app.on_event("startup")
    async def on_startup():
        logger.info(
            "Starting app in %s on %s:%s",
            settings.app_env,
            settings.app_host,
            settings.app_port,
        )

    @app.on_event("shutdown")
    async def on_shutdown():
        logger.info("Shutting down application")

    return app


app = create_app()