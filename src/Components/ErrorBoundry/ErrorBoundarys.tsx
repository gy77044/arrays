import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { DefaultAside, DefaultHeader } from '../../Containers';

// Custom fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: {
  error: any;
  resetErrorBoundary: any;
}) => (
  <div className="home-container">
    <div className="action-container">
      <DefaultAside routeList={[]} />
    </div>
    <div className="center-container" style={{ backgroundColor: "white" }}>
      <div className="header-container">
        <DefaultHeader />
      </div>
      <div role="alert">
        <p>There was an issue. Please try again later.</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  </div>
);

const ErrorBoundarys: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundarys;
