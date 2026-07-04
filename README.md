# SortLab

SortLab ist ein interaktiver Visualizer für Sortieralgorithmen. Das Projekt zeigt Schritt für Schritt, wie verschiedene Algorithmen ein Array sortieren, und macht Vergleiche, Swaps, Schritte und Laufzeit verständlich sichtbar.

## Projektstatus

Aktueller Stand: **fertiges Portfolio-Projekt**

## Ziel des Projekts

SortLab soll helfen, Sortieralgorithmen visuell zu verstehen. Statt nur Code oder Theorie zu sehen, können Nutzer beobachten, wie ein Array verändert wird und welche Unterschiede zwischen den Algorithmen entstehen.

## Funktionen

- interaktive Visualisierung von Sortieralgorithmen
- Balkenansicht für Array-Werte
- Live-Steuerung der Geschwindigkeit
- Anzeige von Vergleichen, Swaps, Schritten und Laufzeit
- Lernbereich zur Erklärung der Algorithmen
- Vergleich verschiedener Sortierverfahren
- moderne Weboberfläche
- automatisierte Tests für alle enthaltenen Algorithmen

## Enthaltene Algorithmen

- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort
- Heap Sort

## Tech-Stack

- React
- Vite
- JavaScript
- CSS
- Node.js Test Runner
- GitHub

## Installation

```bash
git clone https://github.com/Aleksandros2/sortlab.git
cd sortlab
npm install
```

## Start

```bash
npm run dev
```

## Tests

```bash
npm test
```

Die Tests prüfen alle Algorithmen mit leeren, bereits sortierten, umgekehrt sortierten sowie doppelten und negativen Werten.

## Produktions-Build

```bash
npm run build
```

## Benutzeranleitung

Eine einfache Anleitung für Personen ohne Informatik-Vorwissen findest du hier:

[Benutzeranleitung für Anfänger](BENUTZERANLEITUNG.md)

## Projektstruktur

```text
sortlab/
|- src/
|  |- App.jsx
|  |- main.jsx
|  |- styles.css
|  `- utils/
|     |- sortAlgorithms.js
|     `- sortAlgorithms.test.js
|- index.html
|- package.json
`- README.md
```

## Lernziel

Dieses Projekt dient dazu,

- Sortierlogik besser zu verstehen
- Visualisierung und State-Management in React zu üben
- Algorithmen nicht nur theoretisch, sondern auch praktisch nachvollziehbar darzustellen
- algorithmische Logik mit automatisierten Tests abzusichern

## Einsatz im Portfolio

SortLab ist ein ergänzendes Portfolio-Projekt und zeigt die Verbindung von Algorithmen, React-State und schrittweiser Visualisierung.
