/**
 * Lädt HTML-Inhalte in Elemente, die das Attribut "w3-include-html" haben.
 * 
 * Diese Funktion durchläuft alle Elemente des Dokuments und sucht nach dem 
 * "w3-include-html"-Attribut, das den Pfad zu einer HTML-Datei angibt. Für jedes gefundene 
 * Element wird ein XMLHttpRequest initiiert, um den angegebenen HTML-Inhalt zu laden.
 * Nach dem Laden wird der Inhalt des Ziel-Elements durch die geladene HTML ersetzt.
 * Im Falle eines Fehlers (z.B. wenn die Seite nicht gefunden wird), wird eine Fehlermeldung
 * im Element angezeigt. Nach dem Laden des Inhalts wird das "w3-include-html"-Attribut entfernt,
 * und die Funktion wird rekursiv aufgerufen, um sicherzustellen, dass alle Elemente bearbeitet werden,
 * die während des Ladens eines HTML-Inhalts hinzugefügt wurden.
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  // Holt alle Elemente des Dokuments
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      // Liest den Wert des "w3-include-html"-Attributs
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
          // Initialisiert eine HTTP-Anfrage, um den HTML-Inhalt zu laden
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4) { // Wenn die Anfrage abgeschlossen ist
                  if (this.status == 200) {elmnt.innerHTML = this.responseText;} // Bei Erfolg den Inhalt ersetzen
                  if (this.status == 404) {elmnt.innerHTML = "Page not found.";} // Bei Fehlschlag eine Fehlermeldung anzeigen
                  // Entfernt das Attribut, um Doppelverarbeitung zu vermeiden
                  elmnt.removeAttribute("w3-include-html");
                  includeHTML(); // Rekursiver Aufruf, um weitere Inhalte zu laden
              }
          };
          xhttp.open("GET", file, true);
          xhttp.send(); // Sendet die Anfrage
          return; // Beendet die Funktion nach dem Starten der Anfrage
      }
  }
}
