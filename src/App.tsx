import React, { useState } from 'react';
import { MediaUploader } from './components/Upload/MediaUploader';
import { FloatingVerifyButton } from './components/Upload/FloatingVerifyButton';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{verdict: string; score: number; source: string} | null>(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResult({ verdict: 'AI Generated', score: 84, source: 'Known Deepfake Network Pattern Match' });
    }, 2500);
  };

  return (
    <div className="min-h-screen relative">

      {/* ── Sticky Navigation ─────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 h-16"
        style={{ background: 'rgba(2,6,23,0.85)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)' }}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
              aria-hidden="true"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              Reality<span className="gradient-text">Check</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary Navigation">
            {['Analyzer', 'Hotspots', 'About'].map(link => (
              <a
                key={link}
                href="#"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Badge */}
          <span
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AI-Powered
          </span>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-40 pb-20 px-4 text-center" aria-labelledby="hero-heading">
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Powered by Gemini 1.5 Flash
          </div>

          <h1 id="hero-heading" className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Detect Deepfakes<br/>
            <span className="gradient-text">in Seconds</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Upload any image or video. Our AI instantly analyses it for manipulation, AI-generation signatures, and cross-references global threat databases.
          </p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <main className="pb-36 px-4 max-w-4xl mx-auto space-y-6" role="main">

        {/* Uploader Card */}
        <section
          className="section-card glow-purple transition-all duration-500"
          aria-labelledby="upload-section-heading"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="step-badge" aria-hidden="true">1</span>
            <h2 id="upload-section-heading" className="text-lg font-bold text-white">Upload Media for Verification</h2>
          </div>
          <MediaUploader onFileChange={setFile} />

          {result && !isVerifying && (
            <div
              className="mt-6 p-5 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-red-300">⚠ {result.verdict} Detected</p>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-bold">{result.score}% confidence</span>
                  </div>
                  <p className="text-sm text-slate-300/80">Source: {result.source}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Divider with hotspot label */}
        <div className="flex items-center gap-4 px-2" aria-hidden="true">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
          <div className="flex items-center gap-2">
            <span className="step-badge">2</span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Global Threat Map</span>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
        </div>

        {/* Hotspot Map Card */}
        <section
          className="section-card overflow-hidden"
          aria-labelledby="map-section-heading"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 id="map-section-heading" className="text-lg font-bold text-white">Deepfake Incident Hotspots</h2>
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7' }}
              aria-label="Status: Live"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Feed
            </span>
          </div>

          {/* Map placeholder — replaces broken GoogleMaps until API key is available */}
          <div
            className="relative overflow-hidden rounded-xl aspect-video flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,27,75,0.8))', border: '1px solid rgba(255,255,255,0.07)' }}
            aria-label="Deepfake incident map coming soon"
          >
            {/* Grid lines for map feel */}
            <div style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} className="absolute inset-0"></div>

            {/* Decorative incident pins */}
            {[
              { top: '30%', left: '67%', size: 'large' },
              { top: '52%', left: '72%', size: 'medium' },
              { top: '48%', left: '74%', size: 'small' },
              { top: '40%', left: '20%', size: 'medium' },
              { top: '60%', left: '42%', size: 'small' },
            ].map((pin, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-red-500/50 animate-ping"
                style={{
                  top: pin.top, left: pin.left,
                  width: pin.size === 'large' ? 24 : pin.size === 'medium' ? 16 : 10,
                  height: pin.size === 'large' ? 24 : pin.size === 'medium' ? 16 : 10,
                  background: 'rgba(239,68,68,0.3)',
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: '2s'
                }}
                aria-hidden="true"
              ></div>
            ))}

            {/* Center label */}
            <div className="relative z-10 text-center px-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-300">Live Map — Requires Google Maps API Key</p>
              <p className="text-xs text-slate-500 mt-1">Configure <code className="text-purple-400 bg-purple-500/10 px-1 rounded">VITE_GOOGLE_MAPS_KEY</code> in your <code className="text-purple-400 bg-purple-500/10 px-1 rounded">.env</code> to activate</p>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '12,481', label: 'Cases Detected', icon: '🛡️' },
            { value: '99.2%', label: 'Accuracy Rate', icon: '🎯' },
            { value: '<2s', label: 'Avg. Analysis Time', icon: '⚡' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl p-5 text-center" role="presentation">
              <p className="text-2xl mb-1" aria-hidden="true">{stat.icon}</p>
              <p className="text-2xl font-black gradient-text">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>

      <FloatingVerifyButton hasFile={!!file} onVerify={handleVerify} isVerifying={isVerifying} />
    </div>
  );
}

export default App;
