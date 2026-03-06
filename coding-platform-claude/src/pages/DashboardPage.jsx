import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/model/AuthContext';
import { useI18n } from '@/shared/i18n/model/I18nContext';
import { DASHBOARD_DATA } from '@/entities/preview/model/platformData';

const STATUS_STYLE = {
  accepted: { label: '통과', color: 'var(--success)', bg: 'var(--success-light)' },
  wrong: { label: '오답', color: 'var(--error)', bg: 'var(--error-light)' },
  timeout: { label: '시간초과', color: 'var(--warning)', bg: 'var(--warning-light)' },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const d = DASHBOARD_DATA;
  const xpPct = Math.round((d.todayXp.current / d.todayXp.goal) * 100);

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-1)' }}>
            {user ? `${user.name}님, 안녕하세요! 👋` : t.dashboard.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>오늘도 꾸준히 학습을 이어가세요</p>
        </div>

        {/* Stat cards */}
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          {/* XP */}
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>오늘의 XP</span>
              <span style={{ fontSize: '1.2rem' }}>⚡</span>
            </div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
              {d.todayXp.current} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {d.todayXp.goal}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${xpPct}%` }} />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{xpPct}% 달성</div>
          </div>

          {/* Streak */}
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>연속 학습</span>
              <span style={{ fontSize: '1.2rem' }}>🔥</span>
            </div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              {d.streak}일
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500 }}>연속 학습 중 🎉</div>
          </div>

          {/* Total Solved */}
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>총 해결 문제</span>
              <span style={{ fontSize: '1.2rem' }}>✅</span>
            </div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              {d.totalSolved}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>이번 달 +12문제</div>
          </div>

          {/* Continue Learning */}
          <div className="card" style={{ padding: 'var(--space-5)', background: 'linear-gradient(135deg, var(--purple-600), var(--purple-500))', border: 'none' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
              이어서 학습
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: 'var(--space-3)' }}>
              {d.currentLesson.title}
            </div>
            <Link
              to={`/unit/${d.currentLesson.unitSlug}`}
              className="btn btn-sm"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              계속하기 →
            </Link>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
              이번 주 활동
            </h2>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
              {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => {
                const val = d.weeklyActivity[i];
                const maxVal = Math.max(...d.weeklyActivity);
                const h = (val / maxVal) * 64;
                const isToday = i === 5;
                return (
                  <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: isToday ? 600 : 400 }}>{val}</div>
                    <div style={{
                      width: '100%', height: h,
                      background: isToday ? 'var(--accent)' : 'var(--purple-200)',
                      borderRadius: 4,
                      minHeight: 4,
                      transition: 'height 0.4s ease',
                    }} />
                    <div style={{ fontSize: '0.75rem', color: isToday ? 'var(--accent)' : 'var(--text-muted)', fontWeight: isToday ? 600 : 400 }}>{day}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="animate-fadeUp">
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem' }}>
                {t.dashboard.recentActivity}
              </h2>
              <Link to="/profile" style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>전체 보기 →</Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['문제', '상태', '언어', '시간', '날짜'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.recentSubmissions.map(s => {
                    const st = STATUS_STYLE[s.status];
                    return (
                      <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 500, color: 'var(--text-primary)' }}>{s.problem}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: st.bg, color: st.color, fontWeight: 600 }}>
                            {st.label}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{s.lang}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{s.time}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
