import React from 'react';
import StatValue from '../atoms/StatValue';

const StatGroup = ({ title, stats }) => (
  <div className="stat-group">
    <h3 className="stat-group-title">{title}</h3>
    <div className="stat-group-content">
      {stats.map((stat, index) => (
        <StatValue
          key={index}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  </div>
);

export default StatGroup;