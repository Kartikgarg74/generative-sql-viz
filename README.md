
```bash

# Generative SQL Viz 🚀
### The UI Strikes Back - Tambo Hackathon 2025

> "May the components be with you"

[![Hackathon](https://img.shields.io/badge/Tambo-The%20UI%20Strikes%20Back-blue)](https://www.wemakedevs.org/hackathons/tambo)
[![Generative UI](https://img.shields.io/badge/Generative%20UI-Tambo%20SDK-green)](https://tambo.ai)

**Live Demo:** [generative-sql-viz.vercel.app](https://generative-sql-viz.vercel.app)

---

## 🎯 Mission Briefing

Transform natural language into intelligent SQL visualizations. Built with **Tambo's Generative UI SDK** - where AI decides which components to render based on user intent.

No more static dashboards. No more complex SQL queries. Just ask, and the Force (AI) will show you the data.

---

## ✨ The Force (Features)

| Feature | What It Does | Tambo Power |
|:---|:---|:---|
| 🗣️ **Natural Language → SQL** | Type "Show me sales by region" → AI generates query | `SmartChart` component auto-rendered |
| 📊 **Auto-Chart Intelligence** | AI picks best viz: bar for categories, line for trends, pie for proportions | Dynamic component selection |
| 🐍 **Python AI Transformations** | "Predict next quarter" → AI writes & executes Python code | `PythonTransform` component |
| 🗄️ **Interactive ER Diagrams** | Visual database schema with relationships | `ERDiagram` + `SchemaVisualizer` |
| 🔌 **Multi-Platform Connect** | Neon, GitHub, Brave, Airtable, Notion integration | `ConnectCard` universal pattern |
| 📤 **Smart Export** | Download as CSV/JSON with one click | `ExportPanel` component |
| 🎨 **Generative UI Canvas** | Drag, drop, persist multiple charts | Tambo's interactable system |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/Kartikgarg74/generative-sql-viz.git

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎬 Demo Script (For Judges)

Try these commands in the live demo:

### 1️⃣ Natural Language SQL
> **"Show me sales by category"**

**Result:** AI queries database → Renders bar chart automatically

### 2️⃣ Chart Transformation
> **"Make it a pie chart"**

**Result:** Component transforms instantly, data preserved

### 3️⃣ AI Python Predictions
> **"Predict next month's sales using Python"**

**Result:**
- AI writes linear regression code
- Executes transformation
- Shows `PythonTransform` component with code + results
- Displays prediction chart

### 4️⃣ Schema Visualization
> **"Show database schema"**

**Result:** Interactive ER diagram with tables, columns, relationships

### 5️⃣ Multi-Platform Demo
> **"Connect to GitHub"** / **"Search web for benchmarks"**

**Result:** Universal connection cards with OAuth flow

---

## 🛠️ Tech Stack

```
⚡ Next.js 15 + React 19        → Modern framework
🎨 Tambo React SDK              → Generative UI engine
📊 Recharts                     → Data visualization
🗄️ SQLite + Better-sqlite3      → Local database
🐘 Neon (demo)                  → External PostgreSQL
🎯 Zustand                      → State management
🔒 Zod                          → Schema validation
```

---

## 🏆 Why This Project Wins

### ✅ Potential Impact
- **Problem:** Static BI tools require SQL knowledge
- **Solution:** Natural language interface for everyone
- **Use Case:** Business analysts, product managers, non-technical stakeholders

### ✅ Creativity & Originality
- **Unique:** Python code generation + execution in SQL workflow
- **Innovative:** Universal connection pattern for all integrations
- **Fresh:** ER diagrams + Generative UI = visual database exploration

### ✅ Technical Implementation
- **7 Tambo components** registered with Zod schemas
- **Custom tools:** SQL execution, Python transformation, web search
- **Type-safe:** Full TypeScript + Zod validation
- **Architecture:** Clean separation of concerns

### ✅ Best Use of Tambo
- **Generative UI:** AI selects between 7+ components based on intent
- **Interactable:** Canvas persists charts across sessions
- **Streaming:** Real-time component updates
- **Tool Integration:** 5 external services connected

### ✅ Aesthetics & UX
- **Clean:** Minimal, focused interface
- **Responsive:** Works on all screen sizes
- **Intuitive:** No learning curve - just type what you want
- **Polished:** Loading states, error handling, success feedback

---

## 🎥 Live Demo

**URL:** https://generative-sql-viz.vercel.app
---

## 📁 Project Structure

```
src/
├── components/tambo/          # Tambo-registered components
│   ├── smart-chart.tsx        # Auto-chart selection
│   ├── python-transform.tsx   # AI code display
│   ├── er-diagram.tsx         # Visual schema
│   ├── schema-visualizer.tsx  # Table list view
│   ├── export-panel.tsx       # CSV/JSON export
│   ├── neon-demo.tsx          # Database browser
│   └── connect-card.tsx       # Universal connector
├── app/api/                   # Backend routes
│   ├── query/route.ts         # SQL execution
│   ├── python/route.ts        # Python sandbox
│   ├── schema/route.ts        # DB introspection
│   └── neon/route.ts          # Neon connection
├── lib/
│   ├── tambo.ts              # Component registry
│   └── canvas-storage.ts     # Zustand persistence
└── db/                        # SQLite + sample data
```

---

## 🤝 Rebel Alliance (Contributing)

Built for [The UI Strikes Back](https://www.wemakedevs.org/hackathons/tambo) hackathon.

**Built with:** ❤️ + ☕ + [Tambo AI](https://tambo.ai)

---

## 📝 License

MIT - May the Force be with your code.

---

> *"The ability to query data is insignificant next to the power of Generative UI."*
> — Darth Vader (probably)
EOF
```
