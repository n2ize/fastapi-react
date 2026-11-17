# Fibonacci API – Minimales Full-Stack-Projekt

Ein einfaches Lehrprojekt zur Veranschaulichung der HTTP/JSON-API-Kommunikation zwischen einem **React-Frontend** und einem **FastAPI-Backend (Python)**.

---

## Projektstruktur

```text
fibonacci-api/
├── backend/
│   ├── main.py              # FastAPI-Server & Fibonacci-Berechnung
│   └── requirements.txt     # Python-Abhängigkeiten (fastapi, uvicorn)
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # React-Hauptkomponente mit fetch-Logik
│   │   ├── App.css          # CSS-Styling für zentrierte Oberfläche
│   │   └── main.jsx         # Einstiegspunkt für React
│   ├── index.html           # HTML-Grundgerüst
│   ├── vite.config.js       # Vite-Entwicklungsserver-Konfiguration
│   └── package.json         # Node.js-Abhängigkeiten und Start-Skripte
└── README.md                # Dokumentation
```

---

## 1. Python-Abhängigkeiten installieren

Öffne ein Terminal im Projektordner und wechsle in das Verzeichnis `backend`:

```bash
cd backend
```

*(Optional, aber empfohlen)* Virtuelle Python-Umgebung erstellen und aktivieren:

- **Windows:**
  ```bash
  python -m venv venv
  .\venv\Scripts\activate
  ```
- **macOS / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

Abhängigkeiten mit `pip` installieren:

```bash
pip install -r requirements.txt
```

---

## 2. Backend starten

Starte den FastAPI-Entwicklungsserver mit `uvicorn`:

```bash
uvicorn main:app --reload --port 8000
```

- Der Server startet auf: **`http://localhost:8000`**
- Automatische interaktive API-Dokumentation (Swagger UI): **`http://localhost:8000/docs`**

---

## 3. Frontend starten

Öffne ein **zweites separates Terminal** und wechsle in das Verzeichnis `frontend`:

```bash
cd frontend
npm install
npm run dev
```

- Das Frontend startet auf: **`http://localhost:5173`**

Öffne die angezeigte URL (`http://localhost:5173`) in deinem Browser.

---

## 4. Verwendete URLs

| Bereich | URL | Beschreibung |
|---|---|---|
| **Frontend** | `http://localhost:5173` | React-Benutzeroberfläche |
| **Backend API** | `http://localhost:8000` | FastAPI-Server |
| **Endpunkt** | `http://localhost:8000/api/fibonacci?n=10` | GET-Endpunkt zur Berechnung |
| **Swagger UI** | `http://localhost:8000/docs` | Interaktive API-Dokumentation |

---

## 5. Funktionsweise des API-Endpunkts

### Anfrage (Request)
- **Methode:** `GET`
- **Pfad:** `/api/fibonacci`
- **Query-Parameter:** `n` (Ganzzahl zwischen `0` und `1000`)
- **Beispiel:** `GET http://localhost:8000/api/fibonacci?n=10`

### Erfolgsantwort (HTTP 200 OK)
```json
{
  "n": 10,
  "result": 55
}
```

### Fehlerantworten (HTTP 400 Bad Request)
- **Wenn N negativ ist (`n < 0`):**
  ```json
  {
    "detail": "N muss eine nicht-negative Ganzzahl sein (n >= 0)."
  }
  ```
- **Wenn N größer als 1000 ist (`n > 1000`):**
  ```json
  {
    "detail": "N darf maximal 1000 sein."
  }
  ```
- **Wenn N keine gültige Ganzzahl ist:**
  ```json
  {
    "detail": "Ungültige Eingabe. Bitte gib eine ganze Zahl für n an."
  }
  ```

---

## 6. Datenfluss und Kommunikation zwischen React und FastAPI

```text
[Benutzer]
   │
   │ 1. Tippt Zahl N ein und klickt "Calculate"
   ▼
[React Frontend (App.jsx)]
   │
   │ 2. fetch("http://localhost:8000/api/fibonacci?n=" + n)
   ▼
[HTTP GET Request an Port 8000]
   │
   │ (CORS-Header erlauben Zugriff von http://localhost:5173)
   ▼
[FastAPI Backend (main.py)]
   │
   │ 3. Validiert Parameter n (0 <= n <= 1000)
   │ 4. Berechnet F(n) iterativ
   │ 5. Antwortet mit JSON: {"n": 10, "result": 55}
   ▼
[HTTP Response (JSON)]
   │
   ▼
[React Frontend (App.jsx)]
   │
   │ 6. const data = await response.json()
   │ 7. Aktualisiert State (setResult oder setError)
   ▼
[Benutzeroberfläche]
     Zeigt Ergebnis oder Fehlermeldung an
```
