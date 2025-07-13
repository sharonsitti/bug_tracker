/**
 * Mock bug data for development and testing
 * This file contains sample bug data to simulate a real bug tracking system
 */

/**
 * Sample bugs array with realistic test data
 * @type {Bug[]}
 */
const bugs = [
  {
    id: 1,
    title: "Login form validation fails on empty password",
    description: "When users submit the login form with an empty password field, the validation doesn't trigger and form submits with blank password.",
    severity: "high",
    status: "open",
    assignee: "john.doe@company.com",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Mobile navigation menu doesn't close on item selection",
    description: "On mobile devices, when a user selects a navigation menu item, the menu remains open instead of closing automatically.",
    severity: "medium",
    status: "in-progress",
    assignee: "jane.smith@company.com",
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: 3,
    title: "Dashboard charts not loading in Safari",
    description: "The analytics charts on the dashboard page fail to render in Safari browser versions 14 and below.",
    severity: "medium",
    status: "resolved",
    assignee: "mike.wilson@company.com",
    createdAt: "2024-01-12T09:15:00Z"
  },
  {
    id: 4,
    title: "Email notifications contain broken image links",
    description: "All email notifications sent to users contain broken image links for the company logo and icons.",
    severity: "low",
    status: "open",
    assignee: "",
    createdAt: "2024-01-10T16:45:00Z"
  },
  {
    id: 5,
    title: "Database connection timeout during peak hours",
    description: "The application experiences database connection timeouts during peak usage hours (2-4 PM EST), causing 500 errors for users.",
    severity: "high",
    status: "in-progress",
    assignee: "alex.rodriguez@company.com",
    createdAt: "2024-01-08T11:00:00Z"
  }
];

/**
 * Counter for generating new bug IDs
 * @type {number}
 */
let nextBugId = 6;

module.exports = {
  bugs,
  nextBugId
};