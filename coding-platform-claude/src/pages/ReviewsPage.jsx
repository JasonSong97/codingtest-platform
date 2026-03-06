import { useState } from 'react';
import { useAuth } from '@/features/auth/model/AuthContext';
import { REVIEWS } from '@/entities/preview/model/platformData';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const filtered = REVIEWS.filter(r => {
    if (filter === 'recommend') return r.recommend;
    if (filter === 'not') return !r.recommend;
    return true;
  });

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(n => ({ n, count: REVIEWS.filter(r => r.rating === n).length }));

  const handleSubmit = () => {
    if (!text.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setText('');
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 860 }}>
        {/* Hero */}
        <div className="page-hero animate-fadeUp">
          <h1>학습자 리뷰</h1>
          <p>실제 학습자들의 솔직한 후기를 확인하세요</p>
        </div>

        {/* Summary */}
        <div className="animate-fadeUp card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)', display: 'grid', gridTemplateColumns: '140px 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 600, color: 'var(--accent)', lineHeight: 1 }}>{avgRating}</div>
            <div style={{ color: 'gold', fontSize: '1.2rem', margin: '4px 0' }}>{'★'.repeat(Math.round(+avgRating))}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{REVIEWS.length}개 리뷰</div>
          </div>
          <div>
            {dist.map(({ n, count }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ width: 24, textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n}★</span>
                <div style={{ flex: 1, height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(count / REVIEWS.length) * 100}%`, background: 'gold', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', width: 20 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="animate-fadeUp" style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-5)' }}>
          {[['all', '전체'], ['recommend', '추천'], ['not', '비추천']].map(([val, label]) => (
            <button
              key={val}
              className={`btn btn-sm ${filter === val ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Reviews list */}
        <div className="stagger" style={{ marginBottom: 'var(--space-10)' }}>
          {filtered.map(r => (
            <div key={r.id} className="card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{r.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{r.user}</span>
                      <span style={{ color: 'gold', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}</span>
                      {r.recommend
                        ? <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>추천</span>
                        : <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>비추천</span>
                      }
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.date}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write review */}
        <div className="animate-fadeUp card" style={{ padding: 'var(--space-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
            리뷰 작성
          </h2>

          {submitted && (
            <div style={{ background: 'var(--success-light)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--success)', fontWeight: 500 }}>
              ✓ 리뷰가 등록되었습니다! (UI 데모 — 실제 저장 없음)
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-3)' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>별점</label>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setRating(n)} style={{ fontSize: '1.4rem', background: 'none', border: 'none', cursor: 'pointer', opacity: n <= rating ? 1 : 0.3 }}>
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="input"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={user ? '솔직한 후기를 남겨주세요...' : '로그인 후 리뷰를 작성할 수 있습니다.'}
            disabled={!user}
            rows={4}
            style={{ resize: 'vertical', marginBottom: 'var(--space-3)' }}
          />

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!user || !text.trim()}
            style={{ opacity: !user || !text.trim() ? 0.5 : 1 }}
          >
            {user ? '리뷰 등록하기' : '로그인이 필요합니다'}
          </button>
        </div>
      </div>
    </div>
  );
}
