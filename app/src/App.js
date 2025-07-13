import React, { useState } from 'react';
import './App.css';
import BugList from './components/BugList';
import BugDetail from './components/BugDetail';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedBugId, setSelectedBugId] = useState(null);

  /**
   * Navigate to bug detail view
   * @param {number} bugId - ID of the bug to view
   */
  const showBugDetail = (bugId) => {
    setSelectedBugId(bugId);
    setCurrentView('detail');
  };

  /**
   * Navigate back to bug list view
   */
  const showBugList = () => {
    setCurrentView('list');
    setSelectedBugId(null);
  };

  return (
    <div className="App">
      {currentView === 'list' && (
        <BugList onBugSelect={showBugDetail} />
      )}
      {currentView === 'detail' && (
        <BugDetail 
          bugId={selectedBugId} 
          onBack={showBugList} 
        />
      )}
    </div>
  );
}

export default App;
