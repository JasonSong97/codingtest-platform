import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/model/AuthContext';
import { useI18n } from '@/shared/i18n/model/I18nContext';
import { GoogleSignInButton } from '@/features/auth/ui/GoogleSignInButton';
import { loadGoogleScript, CLIENT_ID } from '@/features/auth/lib/googleIdentity';
import { TRACKS, REVIEWS } from '@/entities/preview/model/platformData';

const WHY_ITEMS = [
  { icon: '🎯', title: '실전 중심 커리큘럼', desc: '카카오, 네이버, 라인 등 국내 주요 기업 출제 패턴에 최적화된 문제 구성' },
  { icon: '📈', title: '단계별 난이도 설계', desc: '완전 입문자부터 고급자까지 레벨별로 체계적인 학습 경로 제공' },
  { icon: '💡', title: '개념 + 문제 통합', desc: '개념 설명 → 예제 → 연습문제로 이어지는 완결된 학습 사이클' },
  { icon: '🏆', title: 'XP & 연속 학습 시스템', desc: '매일 학습 목표와 스트릭으로 꾸준한 학습 습관 형성' },
];

const HOW_STEPS = [
  { step: '01', title: '트랙 선택', desc: '실력에 맞는 트랙을 골라 체계적인 커리큘럼을 시작하세요' },
  { step: '02', title: '개념 학습', desc: '핵심 알고리즘 개념과 예제 코드를 학습합니다' },
  { step: '03', title: '문제 풀이', desc: '연습 문제를 직접 풀며 개념을 적용합니다' },
  { step: '04', title: '실전 테스트', desc: '모의 코딩 테스트로 실전 감각을 키웁니다' },
];

const STATS = [
  { value: '33,000+', label: '학습자' },
  { value: '500+', label: '문제' },
  { value: '4개', label: '전문 트랙' },
  { value: '87%', label: '합격률' },
];

export default function LandingPage() {
  const { user, loginWithCredential, hasClientId } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    if (!hasClientId) return;
    loadGoogleScript().then(() => {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: ({ credential }) => loginWithCredential(credential),
      });
      window.google.accounts.id.prompt();
    }).catch(console.error);
  }, [hasClientId]);

  return (
    <div>
      {/* ── Hero ──────────────────────────── */}
      <section style={{
        padding: '80px 0 60px',
        background: 'linear-gradient(180deg, var(--purple-50) 0%, var(--off-white) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* BG decoration */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40,
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="animate-fadeUp" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--purple-100)', color: 'var(--purple-700)',
            padding: '6px 14px', borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem', fontWeight: 600,
            marginBottom: 'var(--space-6)',
          }}>
            <span>✨</span> 국내 최고 수준의 코딩 테스트 학습 플랫폼
          </div>

          <h1 className="animate-fadeUp" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-5)',
            animationDelay: '60ms',
            whiteSpace: 'pre-line',
          }}>
            {t.landing.hero}
          </h1>

          <p className="animate-fadeUp" style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: 580,
            margin: '0 auto var(--space-8)',
            lineHeight: 1.7,
            animationDelay: '120ms',
          }}>
            {t.landing.heroSub}
          </p>

          <div className="animate-fadeUp stagger" style={{
            display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: 'var(--space-10)',
            animationDelay: '180ms',
          }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  대시보드로 이동 →
                </Link>
                <Link to="/curriculum" className="btn btn-secondary btn-lg">
                  {t.landing.viewCurriculum}
                </Link>
              </>
            ) : (
              <>
                <Link to="/curriculum" className="btn btn-primary btn-lg">
                  {t.landing.startFree} →
                </Link>
                <Link to="/curriculum" className="btn btn-secondary btn-lg">
                  {t.landing.viewCurriculum}
                </Link>
              </>
            )}
          </div>

          {/* Google Login */}
          {!user && (
            <div className="animate-fadeUp" style={{ display: 'flex', justifyContent: 'center', animationDelay: '240ms' }}>
              <GoogleSignInButton width={260} />
            </div>
          )}

          {user && (
            <div className="animate-fadeIn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 16px 8px 8px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <img src={user.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{user.name}</strong>님, 안녕하세요!
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Stats ─────────────────────────── */}
      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '28px var(--space-6)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, color: 'var(--accent)', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Tracks ───────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: 'var(--space-3)' }}>
              {t.landing.featuredTracks}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>체계적으로 설계된 트랙으로 코딩 테스트를 정복하세요</p>
          </div>

          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
            {TRACKS.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/curriculum" className="btn btn-ghost">
              전체 커리큘럼 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why CodePath ──────────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: 'var(--space-3)' }}>
              {t.landing.whyTitle}
            </h2>
          </div>
          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="card" style={{ padding: 'var(--space-6)' }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', marginBottom: 'var(--space-2)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: 'var(--space-3)' }}>
              {t.landing.howTitle}
            </h2>
          </div>
          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 'var(--space-5)' }}>
            {HOW_STEPS.map((s, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {i < HOW_STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 24, left: '100%',
                    width: 'var(--space-5)', height: 2,
                    background: 'var(--border-2)',
                    zIndex: 0,
                  }} className="hide-mobile" />
                )}
                <div className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{
                    display: 'inline-flex', width: 40, height: 40,
                    background: 'var(--accent-light)', color: 'var(--accent)',
                    borderRadius: 'var(--radius-md)',
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.85rem',
                    marginBottom: 'var(--space-3)',
                  }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews Preview ───────────────── */}
      <section style={{ padding: '80px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: 'var(--space-3)' }}>
              합격자들의 후기
            </h2>
          </div>
          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 'var(--space-4)' }}>
            {REVIEWS.slice(0, 3).map(r => (
              <div key={r.id} className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 'var(--space-3)', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.5rem' }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.user}</div>
                    <div style={{ color: 'gold', fontSize: '0.8rem' }}>{'★'.repeat(r.rating)}</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>"{r.text}"</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/reviews" className="btn btn-ghost">전체 리뷰 보기 →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────── */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--purple-700) 0%, var(--purple-500) 100%)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: 'var(--space-4)' }}>
            지금 바로 시작하세요
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-8)', fontSize: '1.05rem' }}>
            무료 트랙으로 체험하고, 준비가 되면 전체 커리큘럼을 만나보세요.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/curriculum" className="btn btn-lg" style={{ background: 'white', color: 'var(--purple-700)', fontWeight: 600 }}>
              무료로 시작하기 →
            </Link>
            <Link to="/pricing" className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)' }}>
              요금제 확인
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────── */}
      <footer style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: 'var(--space-8) 0' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <p>© 2026 CodePath. All rights reserved.</p>
          <p style={{ marginTop: 4 }}>코딩 테스트 합격의 가장 빠른 길</p>
        </div>
      </footer>
    </div>
  );
}

function TrackCard({ track }) {
  const levelColors = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };
  const levelLabels = { beginner: '입문', intermediate: '중급', advanced: '고급' };

  return (
    <Link to={`/track/${track.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: 'var(--space-5)', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span className="badge" style={{
              background: levelColors[track.level] + '15',
              color: levelColors[track.level],
            }}>
              {levelLabels[track.level]}
            </span>
            {track.isFree ? (
              <span className="badge badge-green">무료</span>
            ) : (
              <span className="badge badge-purple">PRO</span>
            )}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {track.learners.toLocaleString()}명 학습 중
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
          {track.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
          {track.description}
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          {track.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.75rem', padding: '2px 8px',
              background: 'var(--surface-2)', color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-full)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ marginBottom: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{track.totalLessons}개 레슨</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>{track.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${track.progress}%` }} />
          </div>
        </div>
      </div>
    </Link>
  );
}
