import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaUploader } from './MediaUploader';

describe('MediaUploader Component', () => {
  it('renders upload instructions', () => {
    render(<MediaUploader onFileChange={vi.fn()} />);
    expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
  });

  it('calls onFileChange when a file is selected', async () => {
    const handleFileChange = vi.fn();
    render(<MediaUploader onFileChange={handleFileChange} />);
    
    const input = screen.getByLabelText(/upload/i);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(handleFileChange).toHaveBeenCalledWith(file);
    // Preview should switch to showing the file name or image
    expect(screen.getByText('hello.png')).toBeInTheDocument();
  });

  it('rejects unsupported file types gracefully', () => {
    const handleFileChange = vi.fn();
    render(<MediaUploader onFileChange={handleFileChange} />);
    
    const input = screen.getByLabelText(/upload/i);
    const file = new File(['hello'], 'hello.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(handleFileChange).not.toHaveBeenCalled();
    expect(screen.getByText(/unsupported file format/i)).toBeInTheDocument();
  });
});
