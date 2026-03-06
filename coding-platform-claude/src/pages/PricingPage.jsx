import { useState } from 'react';
import { useAuth } from '@/features/auth/model/AuthContext';
import { GoogleSignInButton } from '@/features/auth/ui/GoogleSignInButton';
import { PRICING_PLANS, PAYMENT_METHODS } from '@/entities/preview/model/platformData';

// ── Payment gateway helpers ────────────────────────────────────────────────
const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

async function initiateTossPayment({ plan, user }) {
  if (!TOSS_CLIENT_KEY) {
    alert('토스페이먼츠 클라이언트 키가 설정되지 않았습니다.\n.env.local에 VITE_TOSS_CLIENT_KEY를 추가하세요.');
    return;
  }
  try {
    const { loadTossPayments } = await import('https://js.tosspayments.com/v1');
    const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
    await tossPayments.requestPayment('카드', {
      amount: plan.price,
      orderId: `order_${Date.now()}`,
      orderName: `CodePath ${plan.name}`,
      customerName: user?.name || '비회원',
      customerEmail: user?.email || '',
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  } catch (err) {
    if (err.code !== 'USER_CANCEL') console.error(err);
  }
}

async function initiateStripePayment({ plan, user }) {
  if (!STRIPE_KEY) {
    alert('Stripe 키가 설정되지 않았습니다.\n.env.local에 VITE_STRIPE_PUBLISHABLE_KEY를 추가하세요.');
    return;
  }
  // Stripe Checkout (서버사이드 세션 필요 — 실제 배포 시 백엔드 엔드포인트 연동)
  alert('Stripe 결제를 시작하려면 백엔드 API 엔드포인트(/api/create-checkout-session)를 구현하세요.\n현재는 데모 모드입니다.');
}

export default function PricingPage() {
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(null);

  const handlePurchase = async (plan) => {
    if (plan.price === 0) {
      window.location.href = '/curriculum';
      return;
    }
    if (!user) {
      document.getElementById('pricing-login-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setProcessing(plan.id);
    try {
      if (selectedMethod === 'stripe') {
        await initiateStripePayment({ plan, user });
      } else {
        await initiateTossPayment({ plan, user });
      }
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <div className="page-hero animate-fadeUp">
          <h1>투명한 요금제</h1>
          <p>필요에 맞는 플랜을 선택하세요. 언제든 취소 가능합니다.</p>
        </div>

        {/* Plans */}
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-12)' }}>
          {PRICING_PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isProcessing={processing === plan.id}
              onSelect={() => handlePurchase(plan)}
            />
          ))}
        </div>

        {/* Payment methods */}
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-10)' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-5)', textAlign: 'center' }}>
            결제 수단
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
            {PAYMENT_METHODS.map(m => (
              <div
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className="card"
                style={{
                  padding: 'var(--space-4)',
                  cursor: 'pointer',
                  border: selectedMethod === m.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: selectedMethod === m.id ? 'var(--accent-light)' : 'var(--white)',
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{m.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{m.desc}</div>
                  </div>
                  {selectedMethod === m.id && (
                    <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration status */}
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="card" style={{ padding: 'var(--space-5)', background: 'var(--surface)' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-3)' }}>
              💳 결제 연동 상태
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <StatusRow label="토스페이먼츠" envKey="VITE_TOSS_CLIENT_KEY" value={TOSS_CLIENT_KEY} />
              <StatusRow label="Stripe" envKey="VITE_STRIPE_PUBLISHABLE_KEY" value={STRIPE_KEY} />
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
              .env.local 파일에 키를 추가하면 즉시 실결제가 활성화됩니다.
            </p>
          </div>
        </div>

        {/* Login CTA */}
        {!user && (
          <div id="pricing-login-section" className="animate-fadeUp" style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <div className="card" style={{ padding: 'var(--space-8)', maxWidth: 480, margin: '0 auto' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                로그인 후 구독 가능합니다
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)', fontSize: '0.9rem' }}>
                Google 계정으로 30초 만에 시작하세요
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleSignInButton width={280} />
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="animate-fadeUp">
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-5)', textAlign: 'center' }}>자주 묻는 질문</h2>
          {[
            { q: '무료 트랙과 PRO의 차이가 무엇인가요?', a: '무료는 알고리즘 기초 트랙과 기초 문제 50개를 제공합니다. PRO 구독 시 전체 트랙과 500개+ 문제, AI 코드 피드백, 모의 인터뷰 등을 이용할 수 있습니다.' },
            { q: '언제든지 취소할 수 있나요?', a: '네, 구독 기간 중 언제든지 취소할 수 있습니다. 취소 후에도 결제한 기간 만료까지 이용 가능합니다.' },
            { q: '환불 정책은 어떻게 되나요?', a: '결제 후 7일 이내에 고객 지원팀에 연락하시면 전액 환불을 받으실 수 있습니다.' },
          ].map((faq, i) => (
            <details key={i} className="card" style={{ marginBottom: 'var(--space-3)', padding: 0, overflow: 'hidden' }}>
              <summary style={{ padding: 'var(--space-4) var(--space-5)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', userSelect: 'none' }}>
                {faq.q}
              </summary>
              <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanCard({ plan, onSelect, isProcessing }) {
  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-6)',
        position: 'relative',
        border: plan.highlight ? '2px solid var(--accent)' : '1px solid var(--border)',
        background: plan.highlight ? 'var(--white)' : 'var(--white)',
        display: 'flex', flexDirection: 'column',
        transform: plan.highlight ? 'scale(1.02)' : 'none',
        boxShadow: plan.highlight ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
      }}
    >
      {plan.badge && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, var(--purple-600), var(--purple-400))',
          color: 'white', fontSize: '0.75rem', fontWeight: 700,
          padding: '4px 14px', borderRadius: 'var(--radius-full)',
          whiteSpace: 'nowrap',
        }}>
          {plan.badge}
        </div>
      )}

      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>{plan.name}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 600, color: plan.highlight ? 'var(--accent)' : 'var(--text-primary)', lineHeight: 1 }}>
            {plan.price === 0 ? '무료' : `₩${plan.price.toLocaleString()}`}
          </span>
          {plan.period && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ {plan.period}</span>}
        </div>

        {plan.originalPrice && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₩{plan.originalPrice.toLocaleString()}
            </span>
            <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>{plan.discount}% 할인</span>
          </div>
        )}
      </div>

      <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 'var(--space-6)' }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={isProcessing}
        className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {isProcessing ? <><span className="spinner" style={{ width: 14, height: 14 }} /> 처리 중...</> : plan.cta}
      </button>
    </div>
  );
}

function StatusRow({ label, envKey, value }) {
  const ok = !!value && !value.includes('your_');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: ok ? 'var(--success)' : 'var(--error)', flexShrink: 0 }} />
      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{label}</span>
      <span style={{ color: ok ? 'var(--success)' : 'var(--text-muted)', marginLeft: 4 }}>
        {ok ? '✓ 연동됨' : `미설정 (${envKey})`}
      </span>
    </div>
  );
}
