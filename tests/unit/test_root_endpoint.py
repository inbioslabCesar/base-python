from fastapi.testclient import TestClient

from app.interfaces.http.api import app


def test_root_endpoint_returns_api_info() -> None:
    client = TestClient(app)

    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "SOLID Python API running",
        "health": "/health",
        "docs": "/docs",
    }
