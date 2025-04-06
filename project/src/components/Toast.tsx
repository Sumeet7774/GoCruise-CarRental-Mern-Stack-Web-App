import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  show, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColor = type === 'success' 
    ? 'bg-green-100 border-green-500' 
    : type === 'error'
      ? 'bg-red-100 border-red-500'
      : 'bg-blue-100 border-blue-500';
  
  const textColor = type === 'success' 
    ? 'text-green-800' 
    : type === 'error'
      ? 'text-red-800'
      : 'text-blue-800';

  const Icon = type === 'success' 
    ? CheckCircle 
    : type === 'error'
      ? AlertCircle
      : Info;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md w-full md:w-96 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${bgColor} border-l-4`}>
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${textColor}`} />
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClose}
          className={`w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${textColor} hover:opacity-75 focus:outline-none`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;