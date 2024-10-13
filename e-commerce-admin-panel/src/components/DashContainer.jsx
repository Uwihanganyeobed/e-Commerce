import React, { useEffect, useState } from 'react';
import Dashboard from '../scenes/dashboard/Dashboard';

const DashboardContainer = () => {
  const [counts, setCounts] = useState(null); // Initialize counts to null

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT_HERE');
        const data = await response.json();
        setCounts(data); // Assuming your API returns { users, products, markets, items }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      {counts ? <Dashboard counts={counts} /> : <p>Loading...</p>}
    </div>
  );
};

export default DashboardContainer;
