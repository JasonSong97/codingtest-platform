// ── Logo ────────────────────────────────────────────
export function Logo({ size = 'md' }) {
  const sizes = { sm: { icon: 20, text: '0.9rem' }, md: { icon: 26, text: '1.1rem' }, lg: { icon: 34, text: '1.4rem' } };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: s.icon, height: s.icon,
        background: 'linear-gradient(135deg, var(--purple-600), var(--purple-400))',
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
        flexShrink: 0,
      }}>
        <svg width={s.icon * 0.6} height={s.icon * 0.6} viewBox="0 0 16 16" fill="none">
          <path d="M3 12L8 4L13 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 9H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: s.text,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
      }}>
        CodePath
      </span>
    </div>
  );
}

// ── ThemeToggle ──────────────────────────────────────
import { useTheme } from '@/shared/theme/model/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        width: 36, height: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        transition: 'all var(--transition-fast)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// ── LanguageSelect ───────────────────────────────────
import { useI18n } from '@/shared/i18n/model/I18nContext';

const LANG_LABELS = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文' };

export function LanguageSelect() {
  const { lang, setLang, supported } = useI18n();
  return (
    <select
      value={lang}
      onChange={e => setLang(e.target.value)}
      style={{
        padding: '6px 10px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        color: 'var(--text-secondary)',
        fontSize: '0.8rem',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'var(--font-body)',
      }}
    >
      {supported.map(l => <option key={l} value={l}>{LANG_LABELS[l]}</option>)}
    </select>
  );
}
