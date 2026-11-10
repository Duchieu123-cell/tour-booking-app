import { useEffect, useState, type ReactElement } from 'react';

export interface HealthData {
  status: 'ok';
}

export interface ApiResponse<T> {
  data: T;
}

export type StatusState = 'idle' | 'loading' | 'success' | 'error';

export function App(): ReactElement {
  const [status, setStatus] = useState<StatusState>('idle');
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');

    const fetchHealth = async (): Promise<void> => {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const jsonResult: unknown = await response.json();

        // Narrowing 'unknown' without using 'any'
        if (
          jsonResult !== null &&
          typeof jsonResult === 'object' &&
          'data' in jsonResult &&
          typeof jsonResult.data === 'object' &&
          jsonResult.data !== null &&
          'status' in jsonResult.data &&
          jsonResult.data.status === 'ok'
        ) {
          if (isMounted) {
            setHealthData({ status: 'ok' });
            setStatus('success');
          }
        } else {
          throw new Error('Invalid response structure from /api/health');
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error occurred';
          setErrorMessage(message);
          setStatus('error');
        }
      }
    };

    void fetchHealth();

    return (): void => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '640px',
        margin: '3rem auto',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
      }}
    >
      <h1 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Tour Booking App</h1>
      <p style={{ margin: '0 0 1.5rem 0', color: '#64748b' }}>
        Monorepo Verification & Health Check
      </p>

      <div
        style={{
          padding: '1.25rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
        }}
      >
        <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600 }}>
          Status:{' '}
          <span
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              backgroundColor:
                status === 'success' ? '#dcfce7' : status === 'error' ? '#fee2e2' : '#e0f2fe',
              color: status === 'success' ? '#166534' : status === 'error' ? '#991b1b' : '#0369a1',
            }}
          >
            {status}
          </span>
        </p>

        {status === 'loading' && (
          <p style={{ margin: 0, color: '#475569' }}>
            Calling <code>/api/health</code> via Vite proxy...
          </p>
        )}

        {status === 'success' && healthData && (
          <div>
            <p style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>
              Connected to backend successfully!
            </p>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                borderRadius: '6px',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: '0.875rem',
              }}
            >
              {JSON.stringify({ data: healthData }, null, 2)}
            </pre>
          </div>
        )}

        {status === 'error' && (
          <div>
            <p style={{ margin: '0 0 0.5rem 0', color: '#991b1b' }}>Connection failed:</p>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                borderRadius: '6px',
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca',
                fontSize: '0.875rem',
              }}
            >
              {errorMessage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
