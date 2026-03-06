import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '@/shared/i18n/model/I18nContext';
import { Logo } from '@/shared/ui/index';
import { PROBLEMS } from '@/entities/preview/model/platformData';

const LANGS = ['python', 'javascript', 'java', 'cpp'];
const LANG_LABELS = { python: 'Python', javascript: 'JavaScript', java: 'Java', cpp: 'C++' };

const MOCK_RESULTS = [
  { status: 'accepted', runtime: '64ms', memory: '13.8MB', passedCases: 51, totalCases: 51 },
  { status: 'wrong', runtime: '—', memory: '—', passedCases: 38, totalCases: 51, wrongCase: { input: '[-1,0,3,5,9,12], target=2', expected: '-1', got: '0' } },
  { status: 'timeout', runtime: '>2000ms', memory: '—', passedCases: 12, totalCases: 51 },
];

export default function ProblemPage() {
  const { problemSlug } = useParams();
  const { t } = useI18n();
  const problem = PROBLEMS[problemSlug] || PROBLEMS['find-target-index'];

  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(problem.starterCode[lang] || '');
  const [activeTab, setActiveTab] = useState('problem');
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLangChange = useCallback((newLang) => {
    setLang(newLang);
    setCode(problem.starterCode[newLang] || '');
  }, [problem]);

  const handleRun = () => {
    setRunning(true);
    setActiveTab('result');
    setTimeout(() => {
      setRunning(false);
      setResult({ type: 'run', cases: problem.examples.map((ex, i) => ({ ...ex, status: i === 0 ? 'pass' : 'pass', actual: ex.output })) });
    }, 1200);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setActiveTab('result');
    setTimeout(() => {
      setSubmitting(false);
      const r = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
      setResult({ type: 'submit', ...r });
    }, 1800);
  };

  const DIFF_STYLE = {
    easy:   { label: '쉬움', color: 'var(--easy)' },
    medium: { label: '보통', color: 'var(--warning)' },
    hard:   { label: '어려움', color: 'var(--error)' },
  };
  const diff = DIFF_STYLE[problem.difficulty];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--off-white)' }}>
      {/* ── Topbar ── */}
      <header style={{
        height: 52,
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 var(--space-5)',
        gap: 'var(--space-4)',
        flexShrink: 0,
      }}>
        <Link to="/" style={{ flexShrink: 0 }}><Logo size="sm" /></Link>
        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
        <Link to={`/unit/${problem.unitSlug}`} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          ← 레슨으로 돌아가기
        </Link>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{problem.title}</span>
        <span style={{ fontSize: '0.8rem', color: diff.color, fontWeight: 600 }}>{diff.label}</span>
        <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>+{problem.xp} XP</span>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', minHeight: 0 }}>
        {/* Left panel - problem */}
        <div style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--white)', flexShrink: 0 }}>
            {[
              { id: 'problem', label: '문제' },
              { id: 'examples', label: t.problem.examples },
              { id: 'hints', label: t.problem.hints },
              { id: 'result', label: t.problem.result },
            ].map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ borderRadius: 0, padding: '10px 16px' }}
              >
                {tab.label}
                {tab.id === 'result' && result && (
                  <span style={{
                    marginLeft: 6, width: 7, height: 7, borderRadius: '50%', display: 'inline-block',
                    background: result.status === 'accepted' ? 'var(--success)' : 'var(--error)',
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-5)' }}>
            {activeTab === 'problem' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
                  {problem.title}
                </h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-6)', whiteSpace: 'pre-line' }}>
                  {problem.description}
                </div>

                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
                  예제
                </h3>
                {problem.examples.map((ex, i) => (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-3)', fontSize: '0.85rem' }}>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>입력: </span>
                      <code style={{ fontFamily: 'var(--font-mono)' }}>{ex.input}</code>
                    </div>
                    <div style={{ marginBottom: ex.explanation ? 8 : 0 }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>출력: </span>
                      <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{ex.output}</code>
                    </div>
                    {ex.explanation && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>설명: {ex.explanation}</div>
                    )}
                  </div>
                ))}

                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', marginBottom: 'var(--space-3)', color: 'var(--text-primary)', marginTop: 'var(--space-5)' }}>
                  제약 조건
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {problem.constraints.map((c, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--accent)' }}>·</span>
                      <code style={{ fontFamily: 'var(--font-mono)' }}>{c}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'examples' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-4)' }}>예제 입출력</h2>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="card" style={{ marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
                    <div style={{ background: 'var(--surface)', padding: 'var(--space-2) var(--space-4)', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      예제 {i + 1}
                    </div>
                    <div style={{ padding: 'var(--space-4)' }}>
                      <div style={{ marginBottom: 'var(--space-3)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>입력</div>
                        <div className="code-block" style={{ fontSize: '0.85rem' }}>{ex.input}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>출력</div>
                        <div className="code-block" style={{ fontSize: '0.85rem', color: 'var(--success)' }}>{ex.output}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hints' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-4)' }}>힌트</h2>
                {problem.hints.map((hint, i) => (
                  <details key={i} style={{ marginBottom: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <summary style={{ padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, background: 'var(--surface)', userSelect: 'none' }}>
                      💡 힌트 {i + 1}
                    </summary>
                    <div style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {hint}
                    </div>
                  </details>
                ))}
              </div>
            )}

            {activeTab === 'result' && (
              <div>
                {(running || submitting) && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12)', gap: 'var(--space-4)' }}>
                    <div className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {running ? '코드 실행 중...' : '채점 중...'}
                    </p>
                  </div>
                )}

                {!running && !submitting && !result && (
                  <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>📋</div>
                    <p>실행 또는 제출 버튼을 눌러 결과를 확인하세요</p>
                  </div>
                )}

                {!running && !submitting && result && (
                  <div>
                    {result.type === 'run' && (
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-4)' }}>
                          실행 결과
                        </h3>
                        {result.cases?.map((c, i) => (
                          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)', overflow: 'hidden' }}>
                            <div style={{ background: c.status === 'pass' ? 'var(--success-light)' : 'var(--error-light)', padding: '8px 16px', fontSize: '0.8rem', fontWeight: 600, color: c.status === 'pass' ? 'var(--success)' : 'var(--error)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>테스트 케이스 {i + 1}</span>
                              <span>{c.status === 'pass' ? '✓ 통과' : '✗ 실패'}</span>
                            </div>
                            <div style={{ padding: 'var(--space-3) var(--space-4)', fontSize: '0.8rem' }}>
                              <div><span style={{ color: 'var(--text-muted)' }}>입력: </span><code style={{ fontFamily: 'var(--font-mono)' }}>{c.input}</code></div>
                              <div><span style={{ color: 'var(--text-muted)' }}>예상: </span><code style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{c.output}</code></div>
                              <div><span style={{ color: 'var(--text-muted)' }}>실제: </span><code style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{c.actual}</code></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === 'submit' && (
                      <div>
                        <div style={{
                          textAlign: 'center', padding: 'var(--space-6)',
                          background: result.status === 'accepted' ? 'var(--success-light)' : result.status === 'wrong' ? 'var(--error-light)' : 'var(--warning-light)',
                          borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-5)',
                        }}>
                          <div style={{ fontSize: '2rem', marginBottom: 8 }}>
                            {result.status === 'accepted' ? '🎉' : result.status === 'wrong' ? '❌' : '⏱️'}
                          </div>
                          <div style={{
                            fontSize: '1.2rem', fontWeight: 700,
                            color: result.status === 'accepted' ? 'var(--success)' : result.status === 'wrong' ? 'var(--error)' : 'var(--warning)',
                          }}>
                            {result.status === 'accepted' ? '정답입니다!' : result.status === 'wrong' ? '오답입니다' : '시간 초과'}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                            {result.passedCases} / {result.totalCases} 테스트 케이스 통과
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                          {[
                            { label: '실행 시간', value: result.runtime },
                            { label: '메모리', value: result.memory },
                          ].map(({ label, value }) => (
                            <div key={label} className="card" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right panel - editor */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Editor toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
            padding: '8px var(--space-4)',
            background: 'var(--white)', borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <select
              value={lang}
              onChange={e => handleLangChange(e.target.value)}
              style={{
                padding: '4px 10px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)', background: 'var(--surface)',
                fontSize: '0.8rem', color: 'var(--text-primary)', outline: 'none',
                fontFamily: 'var(--font-mono)', cursor: 'pointer',
              }}
            >
              {LANGS.map(l => <option key={l} value={l}>{LANG_LABELS[l]}</option>)}
            </select>

            <div style={{ flex: 1 }} />

            <button
              onClick={handleRun}
              disabled={running || submitting}
              className="btn btn-ghost btn-sm"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
            >
              {running ? <><span className="spinner" style={{ width: 12, height: 12 }} /> 실행 중</> : '▶ 실행'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={running || submitting}
              className="btn btn-primary btn-sm"
            >
              {submitting ? <><span className="spinner" style={{ width: 12, height: 12 }} /> 제출 중</> : t.problem.submit}
            </button>
          </div>

          {/* Code editor */}
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1,
              padding: 'var(--space-5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'var(--text-primary)',
              background: 'var(--off-white)',
              border: 'none',
              outline: 'none',
              resize: 'none',
              tabSize: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
