/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

interface Metric {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

const MetricsCounter: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: '1', value: 0, suffix: '+', label: 'Years of Experience' },
    { id: '2', value: 0, suffix: '+', label: 'Total Employees' },
    { id: '3', value: 0, suffix: '', label: 'Sewing Capacity Per Day' },
    { id: '4', value: 0, suffix: 'M', label: 'Yearly Turnover' },
  ]);

  const targetValues = [15, 250, 5000, 25]; // Your actual target values

  useEffect(() => {
    const duration = 5000; // Animation duration in ms
    const startTime = Date.now();

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setMetrics(prevMetrics => 
        prevMetrics.map((metric, index) => ({
          ...metric,
          value: Math.floor(progress * targetValues[index])
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    animateCounters();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                {metric.value.toLocaleString()}{metric.suffix}
              </div>
              <div className="text-lg text-gray-700">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsCounter;