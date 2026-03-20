import { useState, useRef } from 'react';

interface Props {
  onFileChange: (file: File) => void;
}

export function MediaUploader({ onFileChange }: Props) {
  const [error, setError] = useState<string>('');
  const [previewName, setPreviewName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'video/mp4', 'image/webp'];

  const handleFile = (file?: File | null) => {
    setIsDragging(false);
    if (!file) return;
    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError('Unsupported format. Please upload JPG, PNG, WEBP, or MP4.');
      setPreviewName('');
      return;
    }
    setError('');
    setPreviewName(file.name);
    onFileChange(file);
  };

  return (
    <div
      className={`relative rounded-xl p-10 text-center cursor-pointer transition-all duration-200 outline-none ${
        isDragging
          ? 'scale-[1.01]'
          : ''
      } focus-visible:ring-2 focus-visible:ring-purple-500`}
      style={{
        background: isDragging
          ? 'rgba(139,92,246,0.08)'
          : 'rgba(255,255,255,0.02)',
        border: `2px dashed ${isDragging ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.2s ease'
      }}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); }
      }}
      aria-label="Upload media file — drag and drop or press Enter to browse"
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFile(e.target.files?.[0])}
        accept="image/jpeg,image/png,image/webp,video/mp4"
        aria-hidden="true"
        tabIndex={-1}
      />

      {previewName ? (
        /* ── Success State ── */
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(5,150,105,0.3))', border: '1px solid rgba(16,185,129,0.3)' }}
          >
            <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-white text-sm truncate max-w-xs">{previewName}</p>
            <p className="text-xs text-emerald-400 mt-1">File selected — click Verify to analyze</p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPreviewName(''); setError(''); }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1 rounded-full hover:bg-white/5"
          >
            Remove file
          </button>
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center gap-4 py-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-200 text-base">Drop your media here</p>
            <p className="text-sm text-slate-500 mt-1">or click to browse files</p>
          </div>
          <div className="flex gap-2 mt-1">
            {['JPG', 'PNG', 'WEBP', 'MP4'].map(ext => (
              <span
                key={ext}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {ext}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 inline-block">
          {error}
        </p>
      )}
    </div>
  );
}
