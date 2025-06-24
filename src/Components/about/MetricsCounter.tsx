// src/Components/about/MetricsCounter.tsx
import React, { useState, useEffect } from 'react';

export interface Metrics {
  experienceYears: number;
  totalEmployees: number;
  sewingCapacity: number;
  yearlyTurnover: number;
}

interface MetricsCounterProps {
  metrics: Metrics;
  bgColor?: string;
}

const MetricsCounter: React.FC<MetricsCounterProps> = ({ metrics, bgColor }) => {
  const [display, setDisplay] = useState<Metrics>({
    experienceYears: 0,
    totalEmployees: 0,
    sewingCapacity: 0,
    yearlyTurnover: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      setDisplay({
        experienceYears: Math.floor(t * metrics.experienceYears),
        totalEmployees:  Math.floor(t * metrics.totalEmployees),
        sewingCapacity:  Math.floor(t * metrics.sewingCapacity),
        yearlyTurnover:  Math.floor(t * metrics.yearlyTurnover),
      });
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [metrics]);

  return (
    <section className={`${bgColor ?? 'bg-white'} py-16 px-4 md:px-8`}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-5xl font-bold text-indigo-600 mb-2">
            {display.experienceYears}+
          </div>
          <div className="text-lg text-gray-700">Years of Experience</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-indigo-600 mb-2">
            {display.totalEmployees}+
          </div>
          <div className="text-lg text-gray-700">Total Employees</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-indigo-600 mb-2">
            {display.sewingCapacity.toLocaleString()}
          </div>
          <div className="text-lg text-gray-700">Sewing Capacity Per Day</div>
        </div>
        <div>
          <div className="text-5xl font-bold text-indigo-600 mb-2">
            {display.yearlyTurnover}M
          </div>
          <div className="text-lg text-gray-700">Yearly Turnover</div>
        </div>
      </div>
    </section>
  );
};

export default MetricsCounter;
