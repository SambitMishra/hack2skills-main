import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingVerifyButton } from './FloatingVerifyButton';

describe('FloatingVerifyButton Component', () => {
  it('does not render when hasFile is false', () => {
    render(<FloatingVerifyButton hasFile={false} onVerify={vi.fn()} isVerifying={false} />);
    expect(screen.queryByRole('button', { name: /verify/i })).not.toBeInTheDocument();
  });

  it('renders verify button when hasFile is true', () => {
    render(<FloatingVerifyButton hasFile={true} onVerify={vi.fn()} isVerifying={false} />);
    expect(screen.getByRole('button', { name: /verify/i })).toBeInTheDocument();
  });

  it('calls onVerify when clicked', () => {
    const handleVerify = vi.fn();
    render(<FloatingVerifyButton hasFile={true} onVerify={handleVerify} isVerifying={false} />);
    
    fireEvent.click(screen.getByRole('button', { name: /verify/i }));
    expect(handleVerify).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when isVerifying is true', () => {
    render(<FloatingVerifyButton hasFile={true} onVerify={vi.fn()} isVerifying={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText(/verifying/i)).toBeInTheDocument();
  });
});
