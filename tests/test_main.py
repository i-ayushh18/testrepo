from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app


def test_health_ok():
    client = TestClient(app)
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert "env" in data
    assert "version" in data


def test_error_example_toggle():
    client = TestClient(app)
    ok = client.get("/error-example")
    assert ok.status_code == 200
    bad = client.get("/error-example?raise_error=true")
    assert bad.status_code == 400
    assert bad.json()["detail"] == "This is an intentional example error."