import React from 'react';

interface Props {
  hasFile: boolean;
  onVerify: () => void;
  isVerifying: boolean;
}

export function FloatingVerifyButton({ hasFile, onVerify, isVerifying }: Props) {
  if (!hasFile) return null;

  return (
    <div className="fixed bottom-6 w-full flex justify-center pointer-events-none z-50">
      <button
        type="button"
        onClick={onVerify}
        disabled={isVerifying}
        aria-busy={isVerifying}
        className="pointer-events-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-full shadow-xl transform transition-transform hover:scale-105 active:scale-95 text-lg"
      >
        {isVerifying ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Verifying...</span>
          </>
        ) : (
          <span>Verify Authenticity</span>
        )}
      </button>
    </div>
  );
}
