.PHONY: install run dev test lint format typecheck ci

install:
	python -m pip install --upgrade pip
	pip install -r requirements.txt

run:
	uvicorn app.main:app --host $${APP_HOST:-0.0.0.0} --port $${APP_PORT:-8000} --workers 4

dev:
	uvicorn app.main:app --reload --host $${APP_HOST:-0.0.0.0} --port $${APP_PORT:-8000}

test:
	pytest -q

lint:
	ruff check .

format:
	black .

typecheck:
	mypy app

ci: lint typecheck test