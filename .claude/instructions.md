# 🐛 Bug Tracker – Product Requirements (PRD)

## 🎯 Purpose

This is a simplified bug tracking system designed as a practice sandbox for exploring test strategy, quality posture, and technical decision-making.

The application should reflect common patterns found in real-world internal tools — but remain small enough for someone to fully explore in a short session. It will be used for code walkthroughs, hands-on review of testability, and drafting quality strategies.

---

## 🧩 Key Features

### 1. Bug List View
- Display a list or table of all bugs
- Each bug entry should include:
  - Title
  - Description
  - Severity (low / medium / high)
  - Status (open / in progress / resolved)
  - Assignee

### 2. Bug Detail View
- Show full details of a selected bug
- Allow changing status (e.g., open → in progress)

### 3. Create Bug Form
- Form should allow adding a new bug with the above fields
- Basic validation (e.g., required fields, character limits)
- Upon submit, new bug appears in the list

### 4. Filtering
- Ability to filter bugs by:
  - Severity
  - Status
- Filters can be combined (e.g., show only open high-severity bugs)

---

## ⚠️ Testing & Quality Constraints

- **No tests should be included** in the codebase
- No CI, code comments, or linting required
- Behaviors may be left deliberately underspecified:
  - Example: What happens if a bug is submitted without severity?
  - Example: What if someone tries to resolve an already resolved bug?

These gaps are intentional to invite critical thinking about quality and risk.

---

## 🧠 Design Considerations

- Code should be clean and readable
- Use meaningful filenames and separation of concerns
- Avoid over-abstraction or early optimization
- Keep logic and structure simple and direct

> **Note:** In a future step, artificial bugs, inconsistencies, or shortcuts may be introduced to simulate real-world messiness. For now, the codebase should be functional and minimal.

---

## 🚫 Out of Scope

- No login or authentication functionality
- No database — use a simple in-memory array for bug storage
- No Redux or state libraries
- No automated testing or coverage tools

---

## ✅ Success Criteria

- The app should run locally with minimal setup (e.g., `npm install && npm start`)
- It should be usable via the UI to:
  - View all bugs
  - Create new bugs
  - Update bug status
  - Filter bug list by severity/status
- Codebase should be understandable and reviewable from a quality perspective
