import React, { useState, useEffect } from 'react';
import './BugList.css';

/**
 * BugList component that fetches and displays bugs in a table format
 * Handles loading states, errors, and displays bug data from the API
 */
function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch bugs from the API
   */
  const fetchBugs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:4000/api/bugs');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch bugs: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setBugs(data.data);
      } else {
        throw new Error(data.error?.message || 'Failed to load bugs');
      }
    } catch (err) {
      setError(err.message);
      setBugs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bugs on component mount
  useEffect(() => {
    fetchBugs();
  }, []);

  if (loading) {
    return <div className="loading">Loading bugs...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchBugs}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="bug-list">
      <div className="bug-list-header">
        <h1>Bug Tracker</h1>
        <p>Total bugs: {bugs.length}</p>
      </div>
      
      {bugs.length === 0 ? (
        <div className="no-bugs">
          <p>No bugs found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="bugs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map(bug => (
                <tr key={bug.id} className={`bug-row severity-${bug.severity} status-${bug.status}`}>
                  <td>{bug.id}</td>
                  <td className="bug-title">{bug.title}</td>
                  <td className="bug-description">{bug.description}</td>
                  <td className={`bug-severity severity-${bug.severity}`}>
                    <span className="severity-badge">{bug.severity}</span>
                  </td>
                  <td className={`bug-status status-${bug.status}`}>
                    <span className="status-badge">{bug.status}</span>
                  </td>
                  <td className="bug-assignee">{bug.assignee || 'Unassigned'}</td>
                  <td className="bug-created">
                    {new Date(bug.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BugList;