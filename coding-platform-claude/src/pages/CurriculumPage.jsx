import { Link } from 'react-router-dom';
import { TRACKS } from '@/entities/preview/model/platformData';

const LANGS = ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Kotlin'];
const LEVEL_LABELS = { beginner: '입문', intermediate: '중급', advanced: '고급' };
const LEVEL_COLORS = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };

export default function CurriculumPage() {
  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <div className="page-hero animate-fadeUp" style={{ paddingTop: 'var(--space-10)' }}>
          <h1>전체 커리큘럼</h1>
          <p>코딩 테스트 완벽 대비를 위한 체계적인 학습 트랙</p>
        </div>

        {/* Languages */}
        <div className="animate-fadeUp" style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>지원 언어</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {LANGS.map(l => (
              <span key={l} style={{
                padding: '4px 14px', borderRadius: 'var(--radius-full)',
                background: 'var(--accent-light)', color: 'var(--accent)',
                fontSize: '0.8rem', fontWeight: 500,
              }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Tracks grid */}
        <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
          {TRACKS.map(track => (
            <CurriculumCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CurriculumCard({ track }) {
  const lc = LEVEL_COLORS[track.level];
  const ll = LEVEL_LABELS[track.level];

  return (
    <div className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column' }}>
      {/* Top badges */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <span className="badge" style={{ background: lc + '15', color: lc }}>{ll}</span>
        {track.isFree
          ? <span className="badge badge-green">무료</span>
          : <span className="badge badge-purple">PRO</span>
        }
      </div>

      {/* Title & desc */}
      <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
        {track.title}
      </h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-4)', flex: 1 }}>
        {track.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
        {track.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '0.75rem', padding: '3px 10px',
            background: 'var(--surface-2)', color: 'var(--text-secondary)',
            borderRadius: 'var(--radius-full)',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Chapter summary */}
      {track.chapters.length > 0 && (
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          {track.chapters.slice(0, 3).map((ch, i) => (
            <div key={ch.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '4px 0',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ch.title}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {ch.completed}/{ch.lessonCount}
              </span>
            </div>
          ))}
          {track.chapters.length > 3 && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '4px 0' }}>
              +{track.chapters.length - 3}개 챕터 더
            </div>
          )}
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{track.totalLessons}</span>개 레슨
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{track.learners.toLocaleString()}</span>명 학습
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>진행률</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>{track.progress}%</span>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${track.progress}%` }} /></div>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Link to={`/track/${track.slug}`} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
          상세 보기
        </Link>
        {track.nextPath ? (
          <Link to={track.nextPath} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            {track.progress > 0 ? '이어서 학습' : '시작하기'}
          </Link>
        ) : (
          <button className="btn btn-primary btn-sm" disabled style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed' }}>
            준비 중
          </button>
        )}
      </div>
    </div>
  );
}
