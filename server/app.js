var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();
const port = 4000

/**
 * Bug data structure
 * @typedef {Object} Bug
 * @property {number} id - Unique identifier for the bug
 * @property {string} title - Brief title of the bug (max 100 characters)
 * @property {string} description - Detailed description of the bug (max 500 characters)
 * @property {'low'|'medium'|'high'} severity - Severity level of the bug
 * @property {'open'|'in-progress'|'resolved'} status - Current status of the bug
 * @property {string} assignee - Email address of the assigned person (can be empty)
 * @property {string} createdAt - ISO timestamp when the bug was created
 */

// In-memory data store for bugs
let bugs = [
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

let nextBugId = 6;

// Bug data validation and utility functions
const VALID_SEVERITIES = ['low', 'medium', 'high'];
const VALID_STATUSES = ['open', 'in-progress', 'resolved'];

/**
 * Validates bug data structure
 * @param {Bug} bugData - The bug data to validate
 * @returns {string|null} Error message if invalid, null if valid
 */
function validateBugData(bugData) {
  if (!bugData.title || typeof bugData.title !== 'string' || bugData.title.length > 100) {
    return 'Title is required and must be less than 100 characters';
  }
  if (!bugData.description || typeof bugData.description !== 'string' || bugData.description.length > 500) {
    return 'Description is required and must be less than 500 characters';
  }
  if (bugData.severity && !VALID_SEVERITIES.includes(bugData.severity)) {
    return 'Severity must be one of: low, medium, high';
  }
  if (bugData.status && !VALID_STATUSES.includes(bugData.status)) {
    return 'Status must be one of: open, in-progress, resolved';
  }
  return null;
}

/**
 * Creates a new bug with default values
 * @param {Partial<Bug>} bugData - Bug data (id and createdAt will be auto-generated)
 * @returns {Bug} Complete bug object
 */
function createBug(bugData) {
  return {
    id: nextBugId++,
    title: bugData.title,
    description: bugData.description,
    severity: bugData.severity || 'medium',
    status: bugData.status || 'open',
    assignee: bugData.assignee || '',
    createdAt: new Date().toISOString()
  };
}

// CORS configuration for frontend communication
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes

/**
 * GET /api/bugs - Retrieve all bugs with optional filtering
 * @param {string} [severity] - Filter by severity (low, medium, high)
 * @param {string} [status] - Filter by status (open, in-progress, resolved)
 * @returns {Bug[]} Array of filtered bugs
 * 
 * Examples:
 * - /api/bugs - Returns all bugs
 * - /api/bugs?severity=high - Returns only high severity bugs
 * - /api/bugs?status=open - Returns only open bugs  
 * - /api/bugs?severity=high&status=open - Returns only high severity AND open bugs
 */
app.get('/api/bugs', (req, res) => {
  try {
    let filteredBugs = [...bugs];
    
    // Extract query parameters - filters are applied sequentially for combined filtering
    const { severity, status } = req.query;
    if (severity) {
      if (!VALID_SEVERITIES.includes(severity)) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid severity parameter',
            details: `Severity must be one of: ${VALID_SEVERITIES.join(', ')}`
          }
        });
      }
      filteredBugs = filteredBugs.filter(bug => bug.severity === severity);
    }
    
    // Filter by status if provided
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid status parameter',
            details: `Status must be one of: ${VALID_STATUSES.join(', ')}`
          }
        });
      }
      filteredBugs = filteredBugs.filter(bug => bug.status === status);
    }
    
    res.json({
      success: true,
      data: filteredBugs,
      count: filteredBugs.length,
      filters: {
        severity: severity || null,
        status: status || null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve bugs',
        details: error.message
      }
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// JSON error handler for API
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

app.listen(port, () => {
  console.log(`Bug Tracker API listening on port ${port}`)
})

module.exports = app;
