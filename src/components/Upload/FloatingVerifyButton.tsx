
interface Props {
  hasFile: boolean;
  onVerify: () => void;
  isVerifying: boolean;
}

export function FloatingVerifyButton({ hasFile, onVerify, isVerifying }: Props) {
  if (!hasFile) return null;

  return (
    <div className="fixed bottom-8 inset-x-0 flex justify-center z-50 pointer-events-none px-4">
      <button
        type="button"
        onClick={onVerify}
        disabled={isVerifying}
        aria-busy={isVerifying}
        aria-label={isVerifying ? 'Verification in progress...' : 'Verify media authenticity'}
        className="pointer-events-auto relative flex items-center gap-2.5 text-white font-bold text-sm tracking-wide px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        style={{
          background: isVerifying
            ? 'rgba(30,27,75,0.95)'
            : 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #6366f1 100%)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.45), 0 0 0 1px rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {isVerifying ? (
          <>
            <svg className="animate-spin w-4 h-4 text-purple-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span className="text-purple-200">Analyzing media...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verify Authenticity
          </>
        )}
      </button>
    </div>
  );
}
