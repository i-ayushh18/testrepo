from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Literal

from dotenv import load_dotenv

# Load .env only in local/dev contexts. In production, rely on real env vars.
load_dotenv(override=False)

EnvName = Literal["development", "staging", "production"]


@dataclass(frozen=True)
class Settings:
    app_env: EnvName
    app_host: str
    app_port: int

    @staticmethod
    def _get_env(name: str, default: str | None = None) -> str:
        value = os.getenv(name, default if default is not None else "")
        if value == "":
            raise RuntimeError(f"Missing required environment variable: {name}")
        return value

    @classmethod
    def load(cls) -> "Settings":
        env_raw = os.getenv("APP_ENV", "development").strip().lower()
        if env_raw not in ("development", "staging", "production"):
            raise ValueError(
                "APP_ENV must be one of: development, staging, production"
            )
        host = cls._get_env("APP_HOST", "0.0.0.0").strip()
        port_raw = cls._get_env("APP_PORT", "8000").strip()

        try:
            port = int(port_raw)
        except ValueError as exc:
            raise ValueError("APP_PORT must be an integer") from exc

        if not (1 <= port <= 65535):
            raise ValueError("APP_PORT must be between 1 and 65535")

        return cls(app_env=env_raw, app_host=host, app_port=port)


settings = Settings.load()