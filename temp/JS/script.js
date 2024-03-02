/**
 * Initialisiert die Hauptfunktionen der Anwendung.
 * Lädt dynamische HTML-Inhalte, begrüßt den Benutzer basierend auf der Tageszeit,
 * fokussiert den Hauptbutton und sortiert die Aufgaben in verschiedene Kategorien.
 * Die Sortierung erfolgt mit einer Verzögerung, um sicherzustellen, dass alle
 * Daten geladen wurden.
 */
async function init(){
    await includeHTML(); // Lädt dynamische HTML-Komponenten
    timeDynamicWelcome(); // Zeigt eine begrüßende Nachricht basierend auf der Tageszeit
    buttonFocus(); // Setzt den Fokus auf den Hauptbutton der Seite

    // Verzögert die Ausführung der Sortierfunktionen, um das Laden der Daten abzuwarten
    setTimeout(() => {
        sortTasksByStateToDo();
        sortTasksByStateInProgress();
        numberOfAllTasks(); // Aktualisiert die Anzeige der Gesamtanzahl der Aufgaben
        sortTasksByStateAwaitingFeedback();
        sortTasksByStateDone();
        sortTasksByPrioUrgent(); // Sortiert die Aufgaben nach Dringlichkeit
    }, 250);
}

/**
 * Initialisiert die Registrierungsfunktion der Anwendung.
 * Lädt vorhandene Benutzerdaten beim Start der Registrierungsseite.
 */
async function initRegister(){
    await loadUsers(); // Lädt vorhandene Benutzer aus dem Speicher
}