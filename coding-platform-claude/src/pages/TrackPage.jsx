import { useParams, Link } from 'react-router-dom';
import { TRACKS } from '@/entities/preview/model/platformData';

const STATUS_ICON = {
  completed: { icon: '✓', color: 'var(--success)', bg: 'var(--success-light)' },
  current:   { icon: '▶', color: 'var(--accent)', bg: 'var(--accent-light)' },
  locked:    { icon: '🔒', color: 'var(--text-disabled)', bg: 'var(--surface-2)' },
};

export default function TrackPage() {
  const { trackSlug } = useParams();
  const track = TRACKS.find(t => t.slug === trackSlug) || TRACKS[0];
  const totalCompleted = track.chapters.reduce((sum, ch) => sum + ch.completed, 0);

  return (
    <div className="page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="animate-fadeUp" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
          <Link to="/curriculum" style={{ color: 'var(--accent)' }}>커리큘럼</Link>
          <span>›</span>
          <span>{track.title}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-8)', alignItems: 'start' }}>
          {/* Left - chapters */}
          <div>
            {/* Track header */}
            <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-3)' }}>
                <span className="badge badge-purple">{track.isFree ? '무료' : 'PRO'}</span>
                <span className="badge" style={{ background: '#10b98115', color: '#10b981' }}>
                  {track.level === 'beginner' ? '입문' : track.level === 'intermediate' ? '중급' : '고급'}
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>{track.title}</h1>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>{track.description}</p>

              {/* Overall progress */}
              <div style={{ background: 'var(--surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>전체 진행률</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600 }}>
                    {totalCompleted} / {track.totalLessons} 레슨
                  </span>
                </div>
                <div className="progress-bar" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ width: `${track.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Chapters */}
            <div className="stagger">
              {track.chapters.map((ch, ci) => (
                <ChapterBlock key={ch.id} chapter={ch} idx={ci} />
              ))}
            </div>
          </div>

          {/* Right - sidebar */}
          <div style={{ position: 'sticky', top: 'calc(var(--topbar-h) + var(--space-4))' }}>
            <div className="card animate-fadeIn" style={{ padding: 'var(--space-5)' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-4)' }}>
                현재 학습 위치
              </h3>

              {track.currentUnitSlug ? (
                <>
                  <div style={{ background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>현재 레슨</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      이진 탐색 (Binary Search)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>챕터 2 · 레슨 8/12</div>
                  </div>
                  <Link to={`/unit/${track.currentUnitSlug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    이어서 학습하기 →
                  </Link>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    이 트랙을 아직 시작하지 않았습니다.
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    학습 시작하기 →
                  </button>
                </>
              )}

              <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-muted)' }}>총 레슨</span>
                  <span style={{ fontWeight: 600 }}>{track.totalLessons}개</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-muted)' }}>챕터</span>
                  <span style={{ fontWeight: 600 }}>{track.chapters.length}개</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>학습자</span>
                  <span style={{ fontWeight: 600 }}>{track.learners.toLocaleString()}명</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterBlock({ chapter, idx }) {
  const completedPct = chapter.lessonCount > 0 ? Math.round(chapter.completed / chapter.lessonCount * 100) : 0;

  return (
    <div className="card" style={{ marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
      {/* Chapter header */}
      <div style={{
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{
            display: 'inline-flex', width: 28, height: 28,
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--accent-light)', color: 'var(--accent)',
            borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
          }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{chapter.title}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 8 }}>{chapter.lessonCount}개 레슨</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 80 }}>
            <div className="progress-bar" style={{ height: 5 }}>
              <div className="progress-fill" style={{ width: `${completedPct}%` }} />
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, minWidth: 36, textAlign: 'right' }}>
            {completedPct}%
          </span>
        </div>
      </div>

      {/* Lessons */}
      <div>
        {chapter.lessons.map((lesson, li) => {
          const s = STATUS_ICON[lesson.status] || STATUS_ICON.locked;
          return (
            <Link
              key={lesson.id}
              to={lesson.status !== 'locked' ? `/unit/${lesson.slug}` : '#'}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-5)',
                borderBottom: li < chapter.lessons.length - 1 ? '1px solid var(--border)' : 'none',
                opacity: lesson.status === 'locked' ? 0.5 : 1,
                pointerEvents: lesson.status === 'locked' ? 'none' : 'auto',
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={e => { if (lesson.status !== 'locked') e.currentTarget.style.background = 'var(--surface)'; }}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{
                display: 'inline-flex', width: 22, height: 22,
                alignItems: 'center', justifyContent: 'center',
                background: s.bg, color: s.color,
                borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', flexShrink: 0,
              }}>
                {s.icon}
              </span>
              <span style={{ fontSize: '0.875rem', color: lesson.status === 'current' ? 'var(--accent)' : 'var(--text-primary)', fontWeight: lesson.status === 'current' ? 600 : 400 }}>
                {lesson.title}
              </span>
              {lesson.status === 'current' && (
                <span className="badge badge-purple" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>진행 중</span>
              )}
            </Link>
          );
        })}
        {chapter.lessons.length === 0 && (
          <div style={{ padding: 'var(--space-4) var(--space-5)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            곧 공개될 예정입니다
          </div>
        )}
      </div>
    </div>
  );
}
