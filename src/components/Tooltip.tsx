import React, { useState } from 'react';
import Icon from './Icon';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-10 ${positionClasses[position]}`}>
          <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 max-w-xs">
            {content}
            <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};


interface FieldWithTooltipProps {
  label: string;
  tooltip: string;
  required?: boolean;
}

export const FieldWithTooltip: React.FC<FieldWithTooltipProps> = ({ label, tooltip, required }) => {
  return (
    <div className="flex items-center">
      <span>{label}</span>
      {required && <span className="text-red-500 ml-1">*</span>}
      <Tooltip content={tooltip}>
        <div className="ml-2 cursor-help">
          <Icon type="info" size="sm" className="text-gray-400 hover:text-gray-600" />
        </div>
      </Tooltip>
    </div>
  );
};

export default Tooltip;
