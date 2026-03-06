import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo, ThemeToggle, LanguageSelect } from '@/shared/ui/index';
import { useAuth } from '@/features/auth/model/AuthContext';
import { useI18n } from '@/shared/i18n/model/I18nContext';

export function Topbar() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/dashboard', label: t.nav.dashboard },
    { to: '/curriculum', label: t.nav.curriculum },
    { to: '/pricing', label: t.nav.pricing },
    { to: '/reviews', label: t.nav.reviews },
    { to: '/invite', label: t.nav.invite },
  ];

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      height: 'var(--topbar-h)',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0 }}>
          <Logo />
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 2, flex: 1 }} className="hide-mobile">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: isActive(to) ? 600 : 400,
                color: isActive(to) ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive(to) ? 'var(--accent-light)' : 'transparent',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => { if (!isActive(to)) { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
              onMouseLeave={e => { if (!isActive(to)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginLeft: 'auto' }}>
          <LanguageSelect />
          <ThemeToggle />

          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMenuOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '4px 8px 4px 4px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--border)',
                  background: 'var(--white)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`}
                  alt={user.name}
                  style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {menuOpen && (
                <div
                  onClick={() => setMenuOpen(false)}
                  style={{
                    position: 'fixed', inset: 0, zIndex: 99
                  }}
                />
              )}

              {menuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  minWidth: 180,
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  overflow: 'hidden',
                  zIndex: 101,
                  animation: 'fadeUp 0.15s ease',
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{user.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', padding: '10px 16px', fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'background var(--transition-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {t.nav.mypage}
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '0.875rem', color: 'var(--error)', transition: 'background var(--transition-fast)', cursor: 'pointer', border: 'none', background: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--error-light)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {t.auth.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/pricing" className="btn btn-primary btn-sm" style={{ fontSize: '0.8rem' }}>
              시작하기
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
