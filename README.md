# SortLab

**Deutsch** | [English](./README_EN.md) | [Live-Demo](https://alekszyro.github.io/SortLab/)

SortLab ist ein interaktives Labor für Sortieralgorithmen. Die React-Anwendung visualisiert einzelne Algorithmusereignisse, misst Vergleiche und Array-Schreibzugriffe und stellt zwei Verfahren mit demselben Eingabedatensatz gegenüber.

![SortLab Übersicht](docs/assets/sortlab-demo.png)

Portfolio von **Aleksandar Nikolić** (**Aleksandar Nikolic**, **AleksZyro**), IMS-Schüler aus Buchs AG, Schweiz. [Portfolio](https://aleksandar-nikolic.ch/) · [GitHub](https://github.com/AleksZyro) · [Kontakt](https://aleksandar-nikolic.ch/#contact)

Die [Demoanimation](docs/assets/sortlab-demo.webp) zeigt die frühere Oberfläche.

## Features

- steuerbare Visualisierung mit Start, Pause, Fortsetzen und Reset
- klare Zustände für Vergleiche, Schreibzugriffe und sortierte Bereiche
- Geschwindigkeit und Array-Grösse anpassbar
- validierte Eingabe eigener Ganzzahlen
- Presets für sortierte, umgekehrte, duplizierte und negative Werte
- synchronisierte Animation zweier Algorithmen mit identischem Input, gemeinsamer Geschwindigkeit, Start, Pause und Reset
- Live-Metriken für Vergleiche, Schreibzugriffe und Vertauschungen
- Laufzeit sowie Zeit- und Speicherkomplexität pro Algorithmus
- responsive, tastaturbedienbare Oberfläche mit reduzierter Bewegung

## Algorithms

| Algorithmus    | Best Case  | Average Case | Worst Case | Zusatzspeicher     | Stabil |
| -------------- | ---------- | ------------ | ---------- | ------------------ | ------ |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | O(1)               | Ja     |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | O(1)               | Nein   |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | O(1)               | Ja     |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | O(n)               | Ja     |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | O(log n) im Mittel | Nein   |
| Heap Sort      | O(n log n) | O(n log n)   | O(n log n) | O(1)               | Nein   |

`Schreibzugriffe` zählt Zuweisungen in das Arbeitsarray. Eine Vertauschung verursacht zwei Schreibzugriffe. Diese Definition macht auch Algorithmen wie Insertion Sort und Merge Sort vergleichbar, die Werte verschieben oder schreiben, statt nur zu vertauschen.

## Architecture

SortLab trennt Berechnung, Visualisierung und Wiedergabe bewusst:

```text
Eingabedaten
    │
    ▼
Sortieralgorithmus ──► Domänenereignisse + Metriken
                           │
                           ▼
Visualisierungsadapter ──► unveränderliche UI-Frames
                           │
                           ▼
Playback-Reducer ────────► React-Oberfläche
```

- `src/utils/sortAlgorithms.js` enthält die UI-unabhängigen Algorithmen und die einheitliche Ereignisschnittstelle.
- `src/utils/visualization.js` übersetzt Domänenereignisse in Hervorhebungen für die Balkendarstellung.
- `src/hooks/usePlayback.js` verwaltet Wiedergabe, Pause, Fortschritt und Timer-Lebenszyklus.
- `src/config/algorithms.js` enthält erklärende Texte und fachliche Komplexitätsdaten.
- `src/components/` enthält `Controls`, `SortVisualizer`, `StatsPanel`, `AlgorithmInfo` und `ComparisonPanel`. `VisualizerWorkspace` besitzt den Zustand des einzelnen Laufs.
- `src/utils/comparison.js` richtet beide Ereignisfolgen an einem gemeinsamen Takt aus und hält kürzere Folgen im Endzustand.
- `src/App.jsx` verwaltet nur die Arbeitsbereiche und deren Navigation.

Die Algorithmen verändern den Eingabe-Array nie. Jeder Lauf liefert ein Resultat, Metriken und optional Ereignisse. Die Vergleichsansicht verwendet einen einzigen Timer für beide Ereignisfolgen. Ein separater Lauf ohne Ereignisaufzeichnung ermittelt die instrumentierte Berechnungszeit. Beim Wechsel der Ansicht pausiert die Wiedergabe.

## Technical Highlights

- **Ereignisbasierte Visualisierung:** Algorithmen kennen weder React noch Animationsgeschwindigkeit.
- **Deterministische Metriken:** Vergleiche, Schreibzugriffe und Vertauschungen werden an einer zentralen Instrumentierung gezählt.
- **Kontrollierbare Animation:** Ein getesteter Reducer verhindert inkonsistente Start-, Pause- und Endzustände.
- **Fairer Vergleich:** Beide Algorithmen verarbeiten eine Kopie desselben Datensatzes.
- **Robuste Eingabe:** Länge, Ganzzahligkeit und Wertebereich werden vor der Ausführung validiert.
- **Accessibility:** Semantische Tabs, sichtbare Fokuszustände, Skip-Link, Live-Status und `prefers-reduced-motion`.
- **Qualitätssicherung:** Vitest, ESLint, Prettier und GitHub Actions prüfen jede Änderung an `main` und jeden Pull Request.

Die angezeigte Laufzeit ist eine Browsermessung und kein wissenschaftlicher Benchmark. Sie hängt von Gerät, Browser und Systemlast ab.

## Tech Stack

- React 18
- Vite 8
- JavaScript (ES Modules)
- CSS
- Vitest
- ESLint und Prettier
- GitHub Actions und GitHub Pages

## Running Locally

Voraussetzung: Node.js 22.13 oder neuer (oder Node.js 24). Die exakten installierten Versionen zeigt `npm ls --depth=0`.

```bash
git clone https://github.com/AleksZyro/SortLab.git
cd SortLab
npm ci
npm run dev
```

Vite gibt danach die lokale URL im Terminal aus.

## Testing

```bash
npm test              # Unit-Tests einmalig ausführen
npm run lint          # statische Codeprüfung
npm run format:check  # Formatierung prüfen
npm run build         # Produktions-Build erstellen
npm run check         # alle Prüfungen in CI-Reihenfolge
```

Die Tests decken für jeden Algorithmus leere Arrays, einzelne Werte, sortierte und umgekehrte Daten, Duplikate und negative Werte ab. Zusätzlich werden Ereignisvertrag, Metriken, Visualisierungsadapter, Eingabevalidierung und Playback-Zustände geprüft.

## Deployment

`.github/workflows/deploy-pages.yml` baut `main` mit dem Basispfad `/SortLab/` und veröffentlicht `dist` auf GitHub Pages. Der separate CI-Workflow prüft Formatierung, Linting, Tests und Build.

## What I Learned

Das Projekt zeigt, weshalb Algorithmuslogik und Animation unterschiedliche Verantwortlichkeiten sind. Die Ereignisschnittstelle macht Abläufe beobachtbar, ohne die Algorithmen an React zu koppeln. Ebenso wichtig war eine präzise Definition der Metriken: Schreibzugriffe sind über unterschiedliche Sortierstrategien hinweg aussagekräftiger als eine unscharfe Sammelkennzahl für Bewegungen.

## Dokumentation

- [Benutzeranleitung für Anfänger](BENUTZERANLEITUNG.md)
- [MIT-Lizenz](LICENSE)

## Bekannte Grenzen

![Synchronisierter Vergleich](docs/assets/sortlab-comparison.png)

- Ein Takt entspricht einem aufgezeichneten Ereignis pro Seite, nicht gleicher CPU-Arbeit.
- Arrays sind auf 64 Ganzzahlen zwischen −99 und 99 begrenzt; Ereignis-Snapshots benötigen zusätzlichen Speicher.
- Balkenhöhen verwenden den Betrag; das Vorzeichen steht im Wert. Die Textbeschreibung enthält alle Werte.
- Insertion Sort markiert einen intern sortierten Präfix, der noch keine endgültige Position garantiert.
- Quick Sort verwendet das letzte Element als Pivot: sortierte Daten können quadratische Laufzeit und O(n) Rekursionsspeicher verursachen.
- Komplexitätsangaben beschreiben den Algorithmus ohne Ereignisaufzeichnung; Laufzeitmessungen sind instrumentiert und kein wissenschaftlicher Benchmark.
- Browser-Interaktionen sind manuell geprüft; automatisierte Tests konzentrieren sich auf Algorithmen und Zustandsübergänge.
