import { useState } from 'react';
import "../Dashboard/Dashboard.scss";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality as needed
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          aria-label="Search Dashboard"
        />
        <button type="submit">Search</button>
      </form>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default Dashboard;
