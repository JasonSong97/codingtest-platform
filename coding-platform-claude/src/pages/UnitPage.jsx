import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LESSONS } from '@/entities/preview/model/platformData';

const DIFF_STYLE = {
  easy:   { label: '쉬움', color: 'var(--easy)', bg: '#d1fae5' },
  medium: { label: '보통', color: '#92400e', bg: 'var(--warning-light)' },
  hard:   { label: '어려움', color: 'var(--error)', bg: 'var(--error-light)' },
};

export default function UnitPage() {
  const { unitSlug } = useParams();
  const lesson = LESSONS[unitSlug] || LESSONS['binary-search'];
  const [activeTab, setActiveTab] = useState('concept');
  const [codeLang, setCodeLang] = useState('python');

  const TABS = [
    { id: 'concept', label: '개념 설명' },
    { id: 'problems', label: `연습 문제 (${lesson.problems.length})` },
    { id: 'notes', label: '학습 노트' },
  ];

  return (
    <div className="page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="animate-fadeUp" style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
          <Link to="/curriculum" style={{ color: 'var(--accent)' }}>커리큘럼</Link>
          <span>›</span>
          <Link to="/track/algorithm-basics" style={{ color: 'var(--accent)' }}>알고리즘 기초</Link>
          <span>›</span>
          <span>{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span className="badge badge-purple">레슨 {lesson.id.replace('l-', '')}</span>
            <span className="badge badge-green">+{lesson.xp} XP</span>
            <span className="badge badge-gray">~{lesson.estimatedMin}분</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 'var(--space-2)' }}>{lesson.title}</h1>
        </div>

        {/* Tabs */}
        <div className="tabs animate-fadeUp">
          {TABS.map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'concept' && (
          <div className="stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-6)', alignItems: 'start' }}>
            {/* Main */}
            <div>
              {/* Description */}
              <div className="card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-3)' }}>개요</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{lesson.description}</p>
              </div>

              {/* Code Example */}
              <div className="card" style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem' }}>예제 코드</h2>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {Object.keys(lesson.exampleCode).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setCodeLang(lang)}
                        className="btn btn-sm"
                        style={{
                          background: codeLang === lang ? 'var(--accent)' : 'var(--surface-2)',
                          color: codeLang === lang ? 'white' : 'var(--text-secondary)',
                          padding: '4px 10px',
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="code-block">{lesson.exampleCode[codeLang]}</div>
              </div>
            </div>

            {/* Sidebar - Key concepts */}
            <div style={{ position: 'sticky', top: 'calc(var(--topbar-h) + var(--space-4))' }}>
              <div className="card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-3)' }}>
                  핵심 개념
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {lesson.keyConcepts.map((c, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--accent-light)', border: '1.5px solid var(--purple-200)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', marginBottom: 'var(--space-2)' }}>⚡ 바로 풀어보기</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                  {lesson.problems.length}개의 연습 문제로 개념을 확인하세요
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => document.querySelector('[data-tab="problems"]')?.click()} style={{ width: '100%', justifyContent: 'center' }}>
                  문제 풀기 →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="stagger">
            {lesson.problems.map(p => {
              const diff = DIFF_STYLE[p.difficulty];
              return (
                <div key={p.id} className="card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span className="badge" style={{ background: diff.bg, color: diff.color }}>{diff.label}</span>
                      <span className="badge badge-purple">+{p.xp} XP</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                      {p.title}
                    </h3>
                    <div style={{ display: 'flex', gap: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span>통과율 {p.passRate}%</span>
                      <span>지원 언어: {p.languages.join(', ')}</span>
                    </div>
                  </div>
                  <Link to={`/problem/${p.slug}`} className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                    풀기 →
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="card animate-fadeIn" style={{ padding: 'var(--space-6)' }}>
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-4)' }}>학습 노트</h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'var(--font-body)' }}>
              {lesson.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
