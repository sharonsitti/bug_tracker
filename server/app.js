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

// Import mock data
const { bugs, nextBugId } = require('./data/mockBugs');

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

/**
 * GET /api/bugs/:id - Retrieve a single bug by ID
 * @param {string} id - Bug ID (must be a valid integer)
 * @returns {Bug} Single bug object
 */
app.get('/api/bugs/:id', (req, res) => {
  try {
    const bugId = parseInt(req.params.id, 10);
    
    // Validate that ID is a valid number
    if (isNaN(bugId) || bugId <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid bug ID',
          details: 'Bug ID must be a positive integer'
        }
      });
    }
    
    // Find the bug by ID
    const bug = bugs.find(b => b.id === bugId);
    
    if (!bug) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Bug not found',
          details: `No bug found with ID ${bugId}`
        }
      });
    }
    
    res.json({
      success: true,
      data: bug
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to retrieve bug',
        details: error.message
      }
    });
  }
});

/**
 * PUT /api/bugs/:id - Update a bug by ID
 * @param {string} id - Bug ID (must be a valid integer)
 * @param {Partial<Bug>} body - Bug properties to update
 * @returns {Bug} Updated bug object
 */
app.put('/api/bugs/:id', (req, res) => {
  try {
    const bugId = parseInt(req.params.id, 10);
    
    // Validate that ID is a valid number
    if (isNaN(bugId) || bugId <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid bug ID',
          details: 'Bug ID must be a positive integer'
        }
      });
    }
    
    // Find the bug by ID
    const bugIndex = bugs.findIndex(b => b.id === bugId);
    
    if (bugIndex === -1) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Bug not found',
          details: `No bug found with ID ${bugId}`
        }
      });
    }
    
    // Extract update data from request body
    const updateData = req.body;
    
    // Validate the update data if provided
    if (updateData.title !== undefined) {
      if (!updateData.title || typeof updateData.title !== 'string' || updateData.title.length > 100) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid title',
            details: 'Title is required and must be less than 100 characters'
          }
        });
      }
    }
    
    if (updateData.description !== undefined) {
      if (!updateData.description || typeof updateData.description !== 'string' || updateData.description.length > 500) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid description',
            details: 'Description is required and must be less than 500 characters'
          }
        });
      }
    }
    
    if (updateData.severity !== undefined && !VALID_SEVERITIES.includes(updateData.severity)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid severity',
          details: `Severity must be one of: ${VALID_SEVERITIES.join(', ')}`
        }
      });
    }
    
    if (updateData.status !== undefined && !VALID_STATUSES.includes(updateData.status)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid status',
          details: `Status must be one of: ${VALID_STATUSES.join(', ')}`
        }
      });
    }
    
    // Update the bug with provided data (only update fields that are provided)
    const updatedBug = {
      ...bugs[bugIndex],
      ...Object.fromEntries(
        Object.entries(updateData).filter(([key, value]) => 
          value !== undefined && ['title', 'description', 'severity', 'status', 'assignee'].includes(key)
        )
      )
    };
    
    // Replace the bug in the array
    bugs[bugIndex] = updatedBug;
    
    res.json({
      success: true,
      data: updatedBug,
      message: 'Bug updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to update bug',
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
