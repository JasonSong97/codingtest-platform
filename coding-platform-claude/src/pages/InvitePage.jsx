import { useState } from 'react';
import { useAuth } from '@/features/auth/model/AuthContext';
import { INVITE_POLICY } from '@/entities/preview/model/platformData';

export default function InvitePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const inviteCode = user ? `CP${user.id?.slice(-6)?.toUpperCase() || 'DEMO01'}` : 'CPGUEST';
  const inviteLink = `${window.location.origin}?ref=${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        {/* Hero */}
        <div className="page-hero animate-fadeUp">
          <h1>친구 초대하고 포인트 받기</h1>
          <p>친구를 초대하면 <strong>최대 ₩7,000</strong> 포인트를 받을 수 있어요</p>
        </div>

        {/* Invite code card */}
        <div className="animate-fadeUp card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
            나의 초대 코드
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700,
            color: 'var(--accent)', letterSpacing: '0.15em',
            background: 'var(--accent-light)', padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-md)', display: 'inline-block',
            marginBottom: 'var(--space-5)',
          }}>
            {inviteCode}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              flex: 1, maxWidth: 400,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)',
              textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {inviteLink}
            </div>
            <button
              onClick={handleCopy}
              className={`btn ${copied ? 'btn-secondary' : 'btn-primary'}`}
              style={{ flexShrink: 0 }}
            >
              {copied ? '✓ 복사됨!' : '링크 복사'}
            </button>
          </div>

          {!user && (
            <p style={{ marginTop: 'var(--space-4)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              로그인하면 개인 초대 코드가 생성됩니다
            </p>
          )}
        </div>

        {/* Reward info */}
        <div className="animate-fadeUp" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <div className="card" style={{ padding: 'var(--space-5)', textAlign: 'center', border: '2px solid var(--purple-200)' }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>
              ₩{INVITE_POLICY.inviterReward.toLocaleString()}P
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>나의 보상</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>친구 첫 결제 시 적립</div>
          </div>
          <div className="card" style={{ padding: 'var(--space-5)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--success)', marginBottom: 4 }}>
              ₩{INVITE_POLICY.inviteeReward.toLocaleString()}P
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>친구의 보상</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>초대 코드로 가입 시 즉시 적립</div>
          </div>
        </div>

        {/* Steps */}
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-5)' }}>참여 방법</h2>
          <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {INVITE_POLICY.steps.map((s, i) => (
              <div key={s.step} className="card" style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  background: 'var(--accent-light)', color: 'var(--accent)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp">
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>자주 묻는 질문</h2>
          {INVITE_POLICY.faq.map((item, i) => (
            <details key={i} className="card" style={{ marginBottom: 'var(--space-3)', padding: 0, overflow: 'hidden' }}>
              <summary style={{ padding: 'var(--space-4) var(--space-5)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', userSelect: 'none' }}>
                Q. {item.q}
              </summary>
              <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
