# 🔍 Quality Posture Exercise

Hi there 👋

This is not just a codebase — it’s a **thinking sandbox**.

The goal of this exercise isn’t to write tests or run the app.  
It’s to explore a project through the lens of someone who leads quality — not by doing everything themselves, but by **shaping direction, selecting tools, and guiding a team with technical clarity**.

There is no testing setup provided here on purpose.  
You get to decide: what’s worth testing, how to approach it, and what infrastructure would support that.

---

## 🎯 What you're here to do

The project simulates a simple bug tracking tool — just enough complexity to reason about quality without being overwhelming.

Your role is to:
- Understand how the app works: front to back
- Identify where **bugs or regressions are most likely to happen**
- Decide **what types of tests should be written** — and in what order of priority
- Recommend **tools, frameworks, and test layers** (e.g., Jest, Playwright, Postman)
- Outline **how you'd guide your team** to implement and maintain a sustainable testing strategy

This is quality leadership in action:  
Not fixing every problem, but knowing where to look, what to prioritize, and how to lead others toward better outcomes.

---

## 📝 What to deliver

Write a short, structured document that includes:
- **Proposed test strategy**
  - What to test (unit vs integration vs E2E)
  - Suggested tools or frameworks — and why
  - Test ownership: who writes what, and where automation fits in
- **Risk assessment**
  - What areas of the code feel especially fragile or likely to break
  - How you'd protect those areas through testing
- **Tooling and environment setup**
  - What test infrastructure you'd introduce (CI? test data? mocks?)
  - How to ensure stability and maintainability over time
- **Team-facing guidance**
  - What you'd want your team to understand about this system's quality posture
  - Any rituals or processes you’d suggest (e.g., testing reviews, test charters, dashboards)

You’re encouraged to make assumptions if anything is unclear. That’s part of the job.

---

## 💡 Pro tips

- Use an AI coding assistant (like Cursor) to ask exploratory questions.
  - Examples: “Where does the bug status get updated?” / “What happens on login?” / “Are there any data validations in place?”
- Don’t try to “solve” everything — highlight where judgment is needed, and how you’d approach decisions with your team.
- Use headings and bullet points to keep your write-up easy to read. Clarity > completeness.

---

## 💬 Why this matters

This exercise mirrors real-world situations:
- No one hands you a perfect spec.
- You inherit code you didn’t write.
- The testing framework might not even exist yet.

And still — your team looks to you for **clarity and direction**.

When you can say:  
*“Here’s where I’d focus, here’s what I’d test, and here’s why,”*  
you create trust, confidence, and forward motion.

This is about building your technical voice —  
so when the moment comes to speak, you don’t need to wait for certainty or approval.  
You’ll speak from a place of grounded confidence.

---

## 🚀 Running the App Locally

Follow these steps to run both the client (React) and server (Express) from scratch, using a single command from the project root.

### 1. Install Dependencies

From the project root, run:

```bash
npm run install-all
```

This will install dependencies for both the client and the server.

---

### 2. Build the React App

From the project root, run:

```bash
npm run build
```

This will build the React frontend and place the static files in the appropriate directory for the server to serve.

---

### 3. Start the Server (and Serve the Client)

From the project root, run:

```bash
npm start
```

This will:
- Build the frontend (if not already built)
- Start the Express server
- Serve both the API and the React app from a single port (default: `http://localhost:3001`)

---

### 4. Access the App

- Open [http://localhost:3001](http://localhost:3001) in your browser to use the app.
- The API is available at endpoints like [http://localhost:3001/api/bugs](http://localhost:3001/api/bugs).
- You can check server health at [http://localhost:3001/health](http://localhost:3001/health).

---

### 5. Troubleshooting

- If you make changes to the React app, re-run `npm run build` before restarting the server.
- If you encounter missing dependencies, ensure you have run `npm run install-all` from the root.

---