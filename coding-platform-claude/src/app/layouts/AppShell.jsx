import { useLocation } from 'react-router-dom';
import { Topbar } from '@/widgets/topbar/Topbar';

const HIDE_TOPBAR = ['/problem'];

export function AppShell({ children }) {
  const { pathname } = useLocation();
  const hideTopbar = HIDE_TOPBAR.some(p => pathname.startsWith(p));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideTopbar && <Topbar />}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
