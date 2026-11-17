from fastapi import FastAPI, HTTPException, Query
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(title="Fibonacci API")

# 1. CORS konfigurieren
# Erlaubt dem React-Frontend (standardmäßig auf http://localhost:5173),
# Anfragen an dieses FastAPI-Backend zu senden.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def calculate_fibonacci(n: int) -> int:
    if n == 0:
        return 0
    if n == 1:
        return 1

    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b


# Einheitlicher Fehler-Handler für ungültige Parameter (z.B. Text statt Zahl)
@app.exception_handler(RequestValidationError)
def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": "Ungültige Eingabe. Bitte gib eine ganze Zahl für n an."},
    )


# 2. GET-Endpunkt: /api/fibonacci?n=10
@app.get("/api/fibonacci")
def get_fibonacci(
    n: int = Query(..., description="Die gewünschte Stelle der Fibonacci-Folge")
):
    # Validierung: Keine negativen Zahlen
    if n < 0:
        raise HTTPException(
            status_code=400,
            detail="N muss eine nicht-negative Ganzzahl sein (n >= 0).",
        )

    # Validierung: Begrenzung auf maximal 1000
    if n > 1000:
        raise HTTPException(
            status_code=400,
            detail="N darf maximal 1000 sein.",
        )

    # Berechnung durchführen
    result = calculate_fibonacci(n)

    # JSON-Antwort zurückgeben
    return {
        "n": n,
        "result": result,
        "erdbeere": "testundso",
    }
