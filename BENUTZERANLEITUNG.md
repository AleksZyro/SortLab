# SortLab Benutzeranleitung für Anfänger

Diese Anleitung ist für Personen gedacht, die Sortieralgorithmen noch nicht kennen oder wenig Informatik-Erfahrung haben.

## Was ist SortLab?

SortLab ist eine Website, die zeigt, wie ein Computer Zahlen sortiert.

Statt nur Code zu lesen, sieht man farbige Balken. Jeder Balken steht für eine Zahl. Wenn ein Algorithmus läuft, sieht man, wie die Balken verglichen und bewegt werden.

## Was kann man damit lernen?

Mit SortLab kann man verstehen:

- wie Sortieralgorithmen grundsätzlich funktionieren
- warum manche Algorithmen schneller sind als andere
- was Vergleiche, Schreibzugriffe und Vertauschungen bedeuten
- wie sich zwei Algorithmen auf demselben Array unterscheiden
- wie sich ein unsortiertes Array Schritt für Schritt verändert

## Starten

Wenn du das Projekt lokal starten willst:

```bash
git clone https://github.com/AleksZyro/SortLab.git
cd SortLab
npm install
npm run dev
```

Danach zeigt das Terminal eine Adresse an, meistens:

```text
http://localhost:5173
```

Diese Adresse im Browser öffnen.

## Bedienung

### 1. Array erzeugen

Am Anfang wird ein zufälliges Array angezeigt. Dieses Array besteht aus Balken mit unterschiedlicher Höhe.

Wenn du ein neues Array möchtest, klicke auf den Button zum Neu-Erzeugen des Arrays.

Du kannst auch eigene Zahlen eingeben, zum Beispiel:

```text
5, 2, -1, 8
```

SortLab akzeptiert ganze Zahlen. Wenn eine Eingabe nicht passt, zeigt die App eine Fehlermeldung.

### 2. Presets verwenden

Mit den Preset-Buttons kannst du typische Testfälle schnell laden:

- sortiert
- umgekehrt
- viele Duplikate
- negative Werte

### 3. Algorithmus auswählen

Wähle einen Sortieralgorithmus aus, zum Beispiel:

```text
Bubble Sort
Selection Sort
Insertion Sort
Merge Sort
Quick Sort
Heap Sort
```

### 4. Sortierung starten

Klicke auf **Sortierung starten**. Während der Animation kannst du pausieren, fortsetzen oder den Ablauf zurücksetzen.

Jetzt beginnt SortLab, das Array Schritt für Schritt zu sortieren.

### 5. Geschwindigkeit ändern

Mit dem Geschwindigkeitsregler kannst du einstellen, ob die Animation langsam oder schnell laufen soll.

Langsam ist besser zum Lernen. Schnell ist besser, wenn du nur das Ergebnis sehen möchtest.

### 6. Werte beobachten

Während der Sortierung zeigt SortLab Statistiken an, zum Beispiel:

- Vergleiche
- Schreibzugriffe
- Vertauschungen
- Generierungszeit

Diese Werte helfen dir zu verstehen, wie aufwendig ein Algorithmus und seine Visualisierung sind.

### 7. Algorithmen vergleichen

Wechsle oben in den Tab **Vergleich**. Wähle zwei Algorithmen und einen gemeinsamen Datensatz. Mit **Vergleich starten** laufen beide Visualisierungen im selben Takt. **Pausieren**, **Fortsetzen** und **Zurücksetzen** wirken auf beide Seiten; die gemeinsame Schrittdauer lässt sich auch während der Wiedergabe ändern. Ein früher fertiger Algorithmus bleibt bei 100 Prozent stehen, während der andere weiterläuft. Jede Seite zeigt Vergleiche, Moves, Schritte und Schreibzugriffe.

## Was bedeuten die wichtigsten Begriffe?

### Array

Ein Array ist eine Liste von Werten. In SortLab wird diese Liste als Balken dargestellt.

### Sortieren

Sortieren bedeutet, die Werte in die richtige Reihenfolge zu bringen, zum Beispiel von klein nach gross.

### Vergleich

Ein Vergleich bedeutet: Der Algorithmus prüft zwei Werte und entscheidet, welcher grösser oder kleiner ist.

### Schreibzugriff

Ein Schreibzugriff bedeutet: Der Algorithmus schreibt einen Wert in das Arbeitsarray. Eine Vertauschung benötigt zwei Schreibzugriffe. Insertion Sort und Merge Sort können Werte schreiben, ohne sie direkt zu vertauschen.

### Generierungszeit

Die Generierungszeit zeigt, wie lange SortLab gebraucht hat, um die Sortierung zu berechnen und alle Animationsereignisse in darstellbare Frames umzuwandeln. Sie ist kein reiner Algorithmus-Benchmark.

## Empfehlung zum Lernen

1. Starte mit **Bubble Sort**, weil dieser Algorithmus leicht zu verstehen ist.
2. Stelle die Geschwindigkeit langsam ein.
3. Beobachte, welche Balken verglichen und bewegt werden.
4. Nutze danach den Vergleichsmodus mit Quick Sort oder Heap Sort.

## Häufige Fragen

### Warum bewegen sich die Balken?

Die Balken bewegen sich, weil der Algorithmus Werte vergleicht und die Reihenfolge verändert.

### Warum sind manche Algorithmen schneller?

Manche Algorithmen brauchen weniger Vergleiche oder Schreibzugriffe. Deshalb sind sie bei grösseren Arrays oft schneller.

### Muss ich programmieren können?

Nein. SortLab ist dafür gedacht, dass man Sortieralgorithmen visuell verstehen kann.

### Was ist das Ziel?

Am Ende sollen alle Balken sortiert sein, also von klein nach gross angeordnet.
