import React, { useState } from 'react';
import { MediaUploader } from './components/Upload/MediaUploader';
import { FloatingVerifyButton } from './components/Upload/FloatingVerifyButton';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate an API call latency
    setTimeout(() => {
      setIsVerifying(false);
      setResult('AI Probability: 84% - Likely AI Generated. Source: Reddit.');
    }, 2000);
  };

  return (
    <div className="min-h-screen relative p-8 max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Reality Check</h1>
        <p className="text-lg text-gray-600">
          Upload media to securely verify its authenticity. We use advanced AI to detect deepfakes and non-consensual imagery.
        </p>
      </header>
      
      <main className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">1. Select Media</h2>
        <MediaUploader onFileChange={setFile} />
        
        {result && !isVerifying && (
          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <h3 className="text-xl font-bold text-red-800 mb-2">Analysis Complete</h3>
            <p className="text-red-700">{result}</p>
          </div>
        )}
      </main>

      <FloatingVerifyButton 
        hasFile={!!file} 
        onVerify={handleVerify} 
        isVerifying={isVerifying} 
      />
    </div>
  );
}

export default App;
