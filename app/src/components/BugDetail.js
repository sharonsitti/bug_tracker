import React, { useState, useEffect } from 'react';
import './BugDetail.css';

/**
 * BugDetail component that displays full bug information and allows status updates
 * @param {Object} props - Component props
 * @param {number} props.bugId - ID of the bug to display
 * @param {function} props.onBack - Callback function when back button is clicked
 */
function BugDetail({ bugId, onBack }) {
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const validStatuses = ['open', 'in-progress', 'resolved'];

  /**
   * Fetch bug details from the API
   */
  const fetchBug = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:4000/api/bugs/${bugId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Bug not found');
        }
        throw new Error(`Failed to fetch bug: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setBug(data.data);
      } else {
        throw new Error(data.error?.message || 'Failed to load bug');
      }
    } catch (err) {
      setError(err.message);
      setBug(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update bug status
   * @param {string} newStatus - New status to set
   */
  const updateBugStatus = async (newStatus) => {
    if (!bug || newStatus === bug.status) return;

    try {
      setUpdating(true);
      
      // Optimistic update
      const originalBug = { ...bug };
      setBug(prev => ({ ...prev, status: newStatus }));
      
      const response = await fetch(`http://localhost:4000/api/bugs/${bugId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        // Revert optimistic update on error
        setBug(originalBug);
        throw new Error(`Failed to update bug: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setBug(data.data);
      } else {
        // Revert optimistic update on error
        setBug(originalBug);
        throw new Error(data.error?.message || 'Failed to update bug');
      }
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // Fetch bug on component mount or when bugId changes
  useEffect(() => {
    if (bugId) {
      fetchBug();
    }
  }, [bugId]);

  if (loading) {
    return (
      <div className="bug-detail">
        <div className="loading">Loading bug details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bug-detail">
        <div className="bug-detail-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Bug List
          </button>
        </div>
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchBug}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!bug) {
    return (
      <div className="bug-detail">
        <div className="bug-detail-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Bug List
          </button>
        </div>
        <div className="no-bug">
          <p>Bug not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bug-detail">
      <div className="bug-detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Bug List
        </button>
        <h1>Bug #{bug.id}</h1>
      </div>

      <div className="bug-detail-content">
        <div className="bug-detail-main">
          <div className="bug-field">
            <label>Title</label>
            <h2 className="bug-title">{bug.title}</h2>
          </div>

          <div className="bug-field">
            <label>Description</label>
            <div className="bug-description">{bug.description}</div>
          </div>

          <div className="bug-field">
            <label>Assignee</label>
            <div className="bug-assignee">
              {bug.assignee || <span className="unassigned">Unassigned</span>}
            </div>
          </div>

          <div className="bug-field">
            <label>Created</label>
            <div className="bug-created">
              {new Date(bug.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="bug-detail-sidebar">
          <div className="bug-field">
            <label>Severity</label>
            <div className={`bug-severity severity-${bug.severity}`}>
              <span className="severity-badge">{bug.severity}</span>
            </div>
          </div>

          <div className="bug-field">
            <label>Status</label>
            <div className="status-update-section">
              <select
                value={bug.status}
                onChange={(e) => updateBugStatus(e.target.value)}
                disabled={updating}
                className={`status-select status-${bug.status}`}
              >
                {validStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              {updating && <div className="updating-status">Updating...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BugDetail;