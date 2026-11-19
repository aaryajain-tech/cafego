import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Coffee, RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CafeGo Runtime Error Boundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          aria-live="assertive"
          className="min-h-screen bg-[#F8F5EE] text-[#2C221B] flex items-center justify-center p-6"
        >
          <div className="clay-card-warm max-w-md w-full p-8 text-center space-y-4 border-2 border-white shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              <Coffee className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                <span>Experience Paused</span>
              </div>
              <h1 className="text-2xl font-extrabold font-['Outfit'] text-[#2C221B]">
                {this.props.fallbackTitle || 'A Small Spill in the Cafe'}
              </h1>
              <p className="text-xs text-[#6B5546] leading-relaxed">
                The 3D WebGL renderer or interface encountered an unexpected glitch. Your saved preferences, squad perks, and tokens remain safe.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="clay-btn-primary w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] transition-transform"
              aria-label="Refresh CafeGo Application"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Refresh & Re-enter Cafe</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

