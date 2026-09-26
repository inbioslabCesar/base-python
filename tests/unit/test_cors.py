from fastapi.testclient import TestClient

from app.interfaces.http.api import app


def test_cors_preflight_allows_frontend_origin() -> None:
    client = TestClient(app)

    response = client.options(
        "/tasks",
        headers={
            "Origin": "http://127.0.0.1:5173",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )

    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://127.0.0.1:5173"
