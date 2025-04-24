import React from 'react'
import { FaCookieBite } from 'react-icons/fa';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-primary">
          <FaCookieBite className="w-16 h-16 animate-spin" />
          <p className="mt-4 text-lg font-semibold animate-pulse">Loading sweets...</p>
        </div>
      );
}

export default LoadingSpinner