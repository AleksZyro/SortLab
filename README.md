# SortLab

**Deutsch** | [English](./README_EN.md)

SortLab ist ein interaktiver React sorting algorithm visualizer für Bubble Sort, Selection Sort, Insertion Sort, Quick Sort und Heap Sort. Das Projekt zeigt, wie Arrays schrittweise sortiert werden, und macht Vergleiche, Bewegungen, Animationsschritte sowie Berechnungs- und Schrittgenerierungszeit sichtbar.

## Persönlicher Projektbezug

Dieses Repository ist Teil des öffentlichen Portfolios von **Aleksandar Nikolić** (**Aleksandar Nikolic**, **AleksZyro**), IMS-Schüler aus Buchs AG, Schweiz.

- Portfolio: [aleksandar-nikolic.ch](https://aleksandar-nikolic.ch/)
- GitHub: [github.com/AleksZyro](https://github.com/AleksZyro)
- Kontakt und aktuelle Erreichbarkeit: [aleksandar-nikolic.ch/#contact](https://aleksandar-nikolic.ch/#contact)

SortLab ist als algorithm learning tool und Portfolio-Projekt gebaut: Nutzer können Sortierverfahren ausprobieren, eigene Arrays eingeben, negative Werte testen und Algorithmen im Vergleichsmodus gegenüberstellen.

<details>
<summary>Suchprofil</summary>

Dieses Repository ist relevant für Suchen nach:

- sorting algorithm visualizer
- React algorithm visualization
- Bubble Sort, Selection Sort, Insertion Sort, Quick Sort und Heap Sort
- JavaScript sorting algorithms
- Vite React portfolio project
- algorithm learning tool mit Tests und GitHub Pages Demo

</details>

- Live-Demo: [https://alekszyro.github.io/SortLab/](https://alekszyro.github.io/SortLab/)
- Status: **stabile Portfolio-Version**
- Tech-Stack: React 18, Vite 5, JavaScript, CSS, Vitest, GitHub Actions

![SortLab Übersicht](docs/assets/sortlab-demo.png)

## Demo

![SortLab Demo](docs/assets/sortlab-demo.webp)

## Hauptfunktionen

- Balkenvisualisierung für Sortierabläufe
- getrennte Tabs für Visualisierung und Vergleichsmodus
- zufällige Arrays mit einstellbarer Grösse
- eigene Array-Eingabe mit Validierung für ganze Zahlen
- Presets für sortierte, umgekehrte und negative Werte
- steuerbare Animationsgeschwindigkeit
- farbliche Markierung von Vergleichen, Bewegungen und sortierten Werten
- Vergleichsmodus mit zwei unabhängig wählbaren Algorithmen
- Statistik für Vergleiche, Bewegungen, Animationsschritte und Berechnungszeit

## Installation und Schnellstart

```bash
git clone https://github.com/AleksZyro/SortLab.git
cd SortLab
npm ci
npm run dev
```

## Tests und Build

```bash
npm test
npm run build
```

<details>
<summary>Algorithmen</summary>

- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort
- Heap Sort

</details>

<details>
<summary>Vergleiche, Bewegungen und Zeitmessung</summary>

`Vergleiche` zählt, wie oft ein Algorithmus Werte miteinander vergleicht.

`Bewegungen` zählt arrayverändernde Operationen. Bei Bubble Sort, Selection Sort, Quick Sort und Heap Sort sind das echte Vertauschungen. Bei Insertion Sort sind es Verschiebungen und das Einfügen eines Werts an einer neuen Position. Darum heisst die Kennzahl bewusst nicht `Swaps`.

Die angezeigte Zeit heisst **Berechnungs- und Schrittgenerierungszeit**. Sie umfasst die Berechnung der Sortierung und das Erzeugen der Animationsschritte für die Visualisierung. Die Werte sind keine wissenschaftlichen Benchmarks und hängen vom Browser, Gerät und aktuellen Systemzustand ab.

</details>

<details>
<summary>Qualitätssicherung</summary>

Lokal ausgeführt:

- `npm ci`: erfolgreich
- `npm test`: erfolgreich, 42 Tests bestanden
- `npm run build`: erfolgreich, Vite-Build erstellt

Die Tests prüfen alle vorhandenen Sortieralgorithmen mit leerem Array, einem Element, bereits sortierten Werten, umgekehrt sortierten Werten, doppelten Werten, negativen Werten, korrekter aufsteigender Sortierung sowie plausibler Zählung von Vergleichen und Bewegungen.

</details>

<details>
<summary>Deployment</summary>

GitHub Pages ist über `.github/workflows/deploy-pages.yml` vorbereitet. Der Workflow baut mit dem Basispfad `/SortLab/`, lädt `dist` als Pages-Artefakt hoch und deployt zu GitHub Pages.

Falls das Deployment später nicht läuft, sollte in GitHub geprüft werden:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

</details>

<details>
<summary>Projektstruktur</summary>

```text
SortLab/
|- .github/
|  `- workflows/
|     |- ci.yml
|     `- deploy-pages.yml
|- docs/
|  `- assets/
|     |- sortlab-demo.webp
|     `- sortlab-demo.png
|- src/
|  |- App.jsx
|  |- main.jsx
|  |- styles.css
|  `- utils/
|     |- arrayInput.js
|     |- arrayInput.test.js
|     |- sortAlgorithms.js
|     `- sortAlgorithms.test.js
|- index.html
|- package-lock.json
|- package.json
|- vite.config.js
|- README.md
`- README_EN.md
```

</details>

<details>
<summary>Technische Entscheidungen</summary>

- Die Sortierfunktionen erzeugen Zustände für die Animation, damit die UI jeden Schritt darstellen kann.
- Die Statistik verwendet `Bewegungen`, weil nicht jeder Algorithmus nur echte Swaps nutzt.
- Die Zeitmessung wird nicht als reine Algorithmuslaufzeit dargestellt.
- Die Tests prüfen die Algorithmuslogik unabhängig von der React-Oberfläche.
- GitHub Actions nutzt Node.js 22 und `npm ci`.

</details>

<details>
<summary>Bekannte Einschränkungen</summary>

- Der Vergleichsmodus zeigt Statistikwerte, animiert aber nicht beide Algorithmen parallel.
- Die Zeitmessung ist abhängig von Browser und Gerät.
- Es gibt keine automatisierten UI-Tests.
- GitHub Pages ist vorbereitet, aber die Repository-Einstellung muss manuell auf GitHub Actions gesetzt werden.

</details>

<details>
<summary>Repository-Metadaten Vorschlag</summary>

- Description: `Interactive React sorting algorithm visualizer for Bubble Sort, Quick Sort, Heap Sort and algorithm comparisons.`
- Website: `https://alekszyro.github.io/SortLab/`
- Topics: `react`, `sorting-algorithms`, `algorithm-visualizer`, `bubble-sort`, `quick-sort`, `heap-sort`, `vite`, `portfolio-project`

</details>

## Benutzeranleitung

Eine einfache Anleitung für Personen ohne Informatik-Vorwissen findest du hier:

[Benutzeranleitung für Anfänger](BENUTZERANLEITUNG.md)

## Lizenzstatus

Dieses Projekt ist unter der MIT-Lizenz veröffentlicht. Details stehen in [LICENSE](./LICENSE).
