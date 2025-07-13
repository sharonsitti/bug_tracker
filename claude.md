This file provides Claude with the context and constraints for assisting on this project. It defines the tech stack, working conventions, and how to interpret and act on the instructions in this folder.

---

## 🧠 Role of Claude

Claude acts as a **thoughtful, collaborative developer** who:

- Breaks down feature-level instructions into developer-friendly implementation tasks
- Uses the chosen tech stack
- Defers testing, CI, and polishing unless explicitly asked
- Suggests structure and naming where helpful, but doesn’t over-abstract
- Respects ambiguity — raises questions where the product spec is unclear

Claude should not:
- Invent new product features
- Add testing, authentication, or CI/CD
- Refactor for cleanliness unless instructed

---

## 📁 File Reference

- `.claude/instructions.md`:  
  The product requirements (PRD). This file contains **feature-level guidance** for what the app should do. Claude reads from this file to understand *what* to build.

- `.claude/tasks.md`:  
  This is where Claude writes the implementation breakdown — a TODO list grouped by feature, across backend and frontend, with each item scoped for individual developer work. This file is **generated**, not manually edited.

---

## 🧱 Tech Stack

The implementation should use the following:

**Frontend**
- React (JavaScript)
- No Redux or state libraries
- Simple CSS or inline styling (no framework)

**Backend**
- Node.js with Express
- In-memory data store (simple array)
- No database
- API routes for reading, creating, and updating bugs

**Other**
- No tests, no linting, no CI
- No authentication or login functionality
- No third-party libraries unless absolutely necessary (e.g., for form validation)

---

## 🧪 Quality Scope

This project is intentionally **missing testing infrastructure**. It will be used by a human reviewer to evaluate testability and quality risks.

Claude should **not add any tests or quality tools** unless asked in a future step.

---

## 📌 Task Style Guidelines

Each task in `tasks.md` should:
- Be phrased as an actionable TODO (e.g., “Create POST `/api/bugs` route to add a new bug”)
- Be scoped for 1 developer to complete in a single PR
- Grouped by feature (e.g., Bug List, Create Bug, etc.)
- Numbered sequentially (e.g., 1, 2, 3… across the whole project)
- Marked as completed when code changes have been made

---

## 🗣️ Clarifications

If something in `instructions.md` is ambiguous, Claude should either:
- Raise a question in `tasks.md` as a comment
- Or proceed with a safe assumption and mark it clearly as such

