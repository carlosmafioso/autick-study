import React from 'react';

export default function CircularProgress({ 
  percentage = 0, 
  size = 40, // width & height in px
  strokeWidth = 3,
  colorClass = 'text-gradient-primary',
  trackColorClass = 'text-surface-container-highest',
  svgClassName = '',
  dropShadow = '',
  children
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className={`w-full h-full -rotate-90 ${svgClassName}`}>
        <circle 
          className={trackColorClass} 
          cx={center} 
          cy={center} 
          fill="transparent" 
          r={radius} 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
        />
        <circle 
          className={colorClass.includes('text-') ? colorClass : ''} 
          cx={center} 
          cy={center} 
          fill="transparent" 
          r={radius} 
          stroke={colorClass.includes('text-') ? "currentColor" : colorClass} 
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          strokeLinecap="round" 
          strokeWidth={strokeWidth} 
          style={{ 
            transition: 'stroke-dashoffset 1s ease-in-out',
            filter: dropShadow 
          }} 
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
