import { useState } from 'react';
import { useAuth } from '@/features/auth/model/AuthContext';
import { useTheme } from '@/shared/theme/model/ThemeContext';
import { useI18n } from '@/shared/i18n/model/I18nContext';
import { SETTINGS_MENU, SUBMISSION_HISTORY, POINT_LEDGER, PRICING_PLANS } from '@/entities/preview/model/platformData';

const STATUS_STYLE = {
  accepted: { label: '통과', color: 'var(--success)', bg: 'var(--success-light)' },
  wrong:    { label: '오답',   color: 'var(--error)',   bg: 'var(--error-light)' },
  timeout:  { label: '시간초과', color: 'var(--warning)', bg: 'var(--warning-light)' },
};

export default function ProfilePage() {
  const { user, disconnectGoogle, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, supported } = useI18n();
  const [activeSection, setActiveSection] = useState('account');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const LANG_LABELS = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文' };

  return (
    <div className="page">
      <div className="container">
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontSize: '1.8rem' }}>설정</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
          {/* Sidebar */}
          <div className="card animate-fadeIn" style={{ padding: 'var(--space-2)', position: 'sticky', top: 'calc(var(--topbar-h) + var(--space-4))' }}>
            {user && (
              <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--space-2)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff`} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>
                </div>
              </div>
            )}
            {SETTINGS_MENU.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: activeSection === item.id ? 600 : 400,
                  color: activeSection === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                  background: activeSection === item.id ? 'var(--accent-light)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left',
                }}
                onMouseEnter={e => { if (activeSection !== item.id) e.currentTarget.style.background = 'var(--surface)'; }}
                onMouseLeave={e => { if (activeSection !== item.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="animate-fadeUp">
            {/* ── Account ── */}
            {activeSection === 'account' && (
              <SectionWrap title="계정 정보">
                {!user ? (
                  <p style={{ color: 'var(--text-secondary)' }}>로그인이 필요합니다.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                      <img src={user.avatar} alt="" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 700 }}>{user.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</div>
                        {user.emailVerified && <span className="badge badge-green" style={{ marginTop: 4, fontSize: '0.72rem' }}>이메일 인증됨</span>}
                      </div>
                    </div>
                    <Field label="이름" defaultValue={user.name} />
                    <Field label="이메일" defaultValue={user.email} disabled />
                    <Field label="언어 설정" defaultValue={user.locale || 'ko'} />
                    <div style={{ paddingTop: 'var(--space-2)' }}>
                      <button className="btn btn-primary" onClick={handleSave}>
                        {saved ? '✓ 저장됨' : '저장하기'}
                      </button>
                    </div>
                  </div>
                )}
              </SectionWrap>
            )}

            {/* ── Membership ── */}
            {activeSection === 'membership' && (
              <SectionWrap title="멤버십">
                <div className="card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)', background: 'linear-gradient(135deg, var(--purple-700), var(--purple-500))', border: 'none' }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginBottom: 4 }}>현재 플랜</div>
                  <div style={{ color: 'white', fontSize: '1.3rem', fontWeight: 700 }}>무료 플랜</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: 4 }}>기초 트랙 + 문제 50개 이용 가능</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {PRICING_PLANS.filter(p => p.price > 0).map(plan => (
                    <div key={plan.id} className="card" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{plan.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>₩{plan.price.toLocaleString()} / {plan.period}</div>
                      </div>
                      <button className="btn btn-primary btn-sm">업그레이드</button>
                    </div>
                  ))}
                </div>
              </SectionWrap>
            )}

            {/* ── Email ── */}
            {activeSection === 'email' && (
              <SectionWrap title="이메일 설정">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div className="card" style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>계정 이메일</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user?.email || '—'}</div>
                      </div>
                      {user?.emailVerified && <span className="badge badge-green">인증됨</span>}
                    </div>
                  </div>
                  {[
                    { label: '학습 진행 알림', desc: '레슨 완료, XP 달성 등 학습 관련 알림' },
                    { label: '마케팅 이메일', desc: '새 기능, 프로모션 등 소식' },
                    { label: '주간 학습 리포트', desc: '주간 학습 요약 이메일' },
                  ].map((item, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                      </div>
                      <Toggle defaultOn={i === 0} />
                    </div>
                  ))}
                </div>
              </SectionWrap>
            )}

            {/* ── Social ── */}
            {activeSection === 'social' && (
              <SectionWrap title="소셜 로그인">
                <div className="card" style={{ padding: 'var(--space-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'white', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                      G
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Google</div>
                      <div style={{ fontSize: '0.85rem', color: user ? 'var(--success)' : 'var(--text-muted)' }}>
                        {user ? `${user.email} 연결됨` : '연결되지 않음'}
                      </div>
                    </div>
                  </div>
                  {user && (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={disconnectGoogle}
                      style={{ color: 'var(--error)', borderColor: 'var(--error)' }}
                    >
                      연결 해제
                    </button>
                  )}
                </div>
              </SectionWrap>
            )}

            {/* ── Password ── */}
            {activeSection === 'password' && (
              <SectionWrap title="비밀번호">
                <div className="card" style={{ padding: 'var(--space-5)', background: 'var(--surface)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Google 소셜 로그인을 사용 중입니다. 별도 비밀번호 설정은 필요하지 않습니다.
                  </p>
                </div>
              </SectionWrap>
            )}

            {/* ── Notifications ── */}
            {activeSection === 'notifications' && (
              <SectionWrap title="알림 설정">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {[
                    { label: '스트릭 알림', desc: '연속 학습이 끊기기 전에 알림' },
                    { label: 'XP 달성', desc: '일일 XP 목표 달성 시 알림' },
                    { label: '신규 문제', desc: '새 문제 추가 시 알림' },
                    { label: '공지사항', desc: '서비스 공지 및 업데이트' },
                  ].map((item, i) => (
                    <div key={i} className="card" style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                      </div>
                      <Toggle defaultOn={i < 2} />
                    </div>
                  ))}
                </div>
              </SectionWrap>
            )}

            {/* ── Preferences ── */}
            {activeSection === 'preferences' && (
              <SectionWrap title="환경 설정">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div className="card" style={{ padding: 'var(--space-5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>테마</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>현재: {theme === 'light' ? '라이트 모드' : '다크 모드'}</div>
                      </div>
                      <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
                        {theme === 'light' ? '🌙 다크로 전환' : '☀️ 라이트로 전환'}
                      </button>
                    </div>
                  </div>
                  <div className="card" style={{ padding: 'var(--space-5)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 'var(--space-3)' }}>언어</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {supported.map(l => (
                        <button
                          key={l}
                          className={`btn btn-sm ${lang === l ? 'btn-primary' : 'btn-ghost'}`}
                          onClick={() => setLang(l)}
                        >
                          {LANG_LABELS[l]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionWrap>
            )}

            {/* ── Submissions ── */}
            {activeSection === 'submissions' && (
              <SectionWrap title="제출 기록">
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border)' }}>
                        {['문제', '상태', '언어', '실행시간', '메모리', '제출일'].map(h => (
                          <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SUBMISSION_HISTORY.map(s => {
                        const st = STATUS_STYLE[s.status];
                        return (
                          <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '10px 12px', fontWeight: 500, color: 'var(--text-primary)' }}>{s.problem}</td>
                            <td style={{ padding: '10px 12px' }}>
                              <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: st.bg, color: st.color, fontWeight: 600 }}>{st.label}</span>
                            </td>
                            <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{s.lang}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{s.runtime}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{s.memory}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{s.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </SectionWrap>
            )}

            {/* Point ledger — always shown at bottom */}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-4)' }}>
                  포인트 내역
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {POINT_LEDGER.map((pt, i) => (
                    <div key={pt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < POINT_LEDGER.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{pt.desc}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{pt.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: pt.amount > 0 ? 'var(--success)' : 'var(--error)' }}>
                          {pt.amount > 0 ? '+' : ''}{pt.amount.toLocaleString()}P
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>잔액 {pt.balance.toLocaleString()}P</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components
function SectionWrap({ title, children }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, defaultValue, disabled }) {
  return (
    <div>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
      <input className="input" defaultValue={defaultValue} disabled={disabled} style={{ opacity: disabled ? 0.6 : 1 }} />
    </div>
  );
}

function Toggle({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(v => !v)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: on ? 'var(--accent)' : 'var(--border-2)',
        border: 'none', cursor: 'pointer',
        position: 'relative',
        transition: 'background var(--transition-base)',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 2, left: on ? 22 : 2,
        width: 20, height: 20,
        background: 'white',
        borderRadius: '50%',
        transition: 'left var(--transition-base)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}
