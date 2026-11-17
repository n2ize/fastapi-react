import { useState } from 'react';
import './App.css';

function App() {
  // State für das Eingabefeld (Zahl n)
  const [n, setN] = useState('');

  // State für das erfolgreiche Ergebnis { n, result }
  const [result, setResult] = useState(null);

  // State für Fehlermeldungen (z.B. Ungültige Eingabe oder Verbindungsfehler)
  const [error, setError] = useState(null);

  // State für den Ladezustand während der HTTP-Anfrage
  const [loading, setLoading] = useState(false);

  // Wird aufgerufen, wenn der Benutzer auf "Calculate" klickt oder Enter drückt
  const handleCalculate = async (e) => {
    e.preventDefault();

    // Vorherige Meldungen und Ergebnisse zurücksetzen
    setError(null);
    setResult(null);

    // Vorprüfung: Ist das Eingabefeld leer?
    if (n.trim() === '') {
      setError('Bitte gib eine Zahl für N ein.');
      return;
    }

    setLoading(true);

    try {
      // 1. HTTP GET-Anfrage an das Python-FastAPI-Backend senden
      const response = await fetch(`http://localhost:8000/api/fibonacci?n=${encodeURIComponent(n)}`);

      // 2. JSON-Antwort parsen
      const data = await response.json();

      // 3. Prüfen, ob der HTTP-Status erfolgreich war (Statuscode 200–299)
      if (!response.ok) {
        // detail aus der Backend-Fehlermeldung verwenden
        const errorMessage = data && data.detail ? data.detail : 'Fehler bei der Berechnung.';
        setError(errorMessage);
      } else {
        // 4. Ergebnis im State speichern, um es im UI anzuzeigen
        setResult(data);
      }
    } catch (err) {
      // 5. Fehler abfangen, falls das Backend nicht erreichbar ist (Netzwerkfehler)
      setError('Verbindung zum Backend fehlgeschlagen. Läuft das FastAPI-Backend auf Port 8000?');
    } finally {
      // Ladezustand beenden
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Fibonacci Calculator</h1>
        <p className="description">
          Gib eine Zahl <em>N</em> ein, um die <em>N</em>-te Fibonacci-Zahl über die Python-API zu berechnen.
        </p>

        <form onSubmit={handleCalculate} className="calc-form">
          <label htmlFor="n-input">Zahl N (0 bis 1000):</label>
          <div className="input-group">
            <input
              id="n-input"
              type="number"
              min="0"
              max="1000"
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="z. B. 10"
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Berechne...' : 'Calculate'}
            </button>
          </div>
        </form>

        {/* Ladezustand */}
        {loading && <div className="status-box loading">Anfrage an Backend läuft...</div>}

        {/* Fehlermeldung */}
        {error && <div className="status-box error">{error}</div>}

        {/* Ergebnis */}
        {result !== null && (
          <div className="status-box result">
            <div className="result-header">Ergebnis für F({result.n}):</div>
            <div className="result-value">{result.result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
