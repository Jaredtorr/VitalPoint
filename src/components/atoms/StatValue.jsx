import React from 'react';

const StatValue = ({ label, value, unit = '' }) => (
  <div className="stat-value">
    <span className="stat-label">{label}</span>
    <span className="stat-number">{value}{unit}</span>
  </div>
);

export default StatValue;