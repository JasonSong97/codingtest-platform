import { createContext, useContext } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

const I18nContext = createContext(null);

const SUPPORTED = ['ko', 'en', 'ja', 'zh'];

const detectLang = () => {
  const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0, 2) : 'ko';
  return SUPPORTED.includes(nav) ? nav : 'ko';
};

const T = {
  ko: {
    nav: { dashboard: '대시보드', curriculum: '커리큘럼', pricing: '요금제', invite: '친구 초대', reviews: '리뷰', mypage: '마이페이지' },
    auth: { login: 'Google로 시작하기', logout: '로그아웃', noKey: 'Google Client ID가 설정되지 않았습니다.' },
    common: { free: '무료', pro: 'PRO', easy: '쉬움', medium: '보통', hard: '어려움', lesson: '레슨', xp: 'XP', solved: '해결', all: '전체' },
    landing: {
      hero: '코딩 테스트,\n체계적으로 정복하다',
      heroSub: '알고리즘부터 실전 모의고사까지, 국내 최고 수준의 커리큘럼으로 취업 코딩 테스트를 준비하세요.',
      startFree: '무료로 시작하기',
      viewCurriculum: '커리큘럼 보기',
      featuredTracks: '추천 트랙',
      whyTitle: '왜 CodePath인가요?',
      howTitle: '학습 흐름',
    },
    dashboard: { title: '대시보드', todayXp: '오늘의 XP', streak: '연속 학습', totalSolved: '총 해결 문제', continueLearning: '이어서 학습', recentActivity: '최근 제출' },
    problem: { run: '실행', submit: '제출', hints: '힌트', examples: '예제', result: '결과', running: '실행 중...' },
  },
  en: {
    nav: { dashboard: 'Dashboard', curriculum: 'Curriculum', pricing: 'Pricing', invite: 'Invite', reviews: 'Reviews', mypage: 'My Page' },
    auth: { login: 'Start with Google', logout: 'Sign Out', noKey: 'Google Client ID is not configured.' },
    common: { free: 'Free', pro: 'PRO', easy: 'Easy', medium: 'Medium', hard: 'Hard', lesson: 'Lesson', xp: 'XP', solved: 'Solved', all: 'All' },
    landing: {
      hero: 'Master Coding Tests,\nSystematically',
      heroSub: 'From algorithms to mock interviews, prepare for coding tests with the best curriculum.',
      startFree: 'Start for Free',
      viewCurriculum: 'View Curriculum',
      featuredTracks: 'Featured Tracks',
      whyTitle: 'Why CodePath?',
      howTitle: 'How It Works',
    },
    dashboard: { title: 'Dashboard', todayXp: "Today's XP", streak: 'Streak', totalSolved: 'Total Solved', continueLearning: 'Continue', recentActivity: 'Recent Submissions' },
    problem: { run: 'Run', submit: 'Submit', hints: 'Hints', examples: 'Examples', result: 'Result', running: 'Running...' },
  },
  ja: {
    nav: { dashboard: 'ダッシュボード', curriculum: 'カリキュラム', pricing: '料金', invite: '招待', reviews: 'レビュー', mypage: 'マイページ' },
    auth: { login: 'Googleで始める', logout: 'ログアウト', noKey: 'Google Client IDが設定されていません。' },
    common: { free: '無料', pro: 'PRO', easy: '簡単', medium: '普通', hard: '難しい', lesson: 'レッスン', xp: 'XP', solved: '解決', all: '全て' },
    landing: {
      hero: 'コーディングテストを\n体系的に制覇する',
      heroSub: 'アルゴリズムから模擬面接まで。',
      startFree: '無料で始める',
      viewCurriculum: 'カリキュラムを見る',
      featuredTracks: 'おすすめトラック',
      whyTitle: 'なぜCodePathか',
      howTitle: '学習の流れ',
    },
    dashboard: { title: 'ダッシュボード', todayXp: '今日のXP', streak: '連続学習', totalSolved: '総解決数', continueLearning: '学習を続ける', recentActivity: '最近の提出' },
    problem: { run: '実行', submit: '提出', hints: 'ヒント', examples: '例題', result: '結果', running: '実行中...' },
  },
  zh: {
    nav: { dashboard: '仪表板', curriculum: '课程', pricing: '价格', invite: '邀请', reviews: '评价', mypage: '我的页面' },
    auth: { login: '使用Google登录', logout: '退出', noKey: '未配置Google Client ID。' },
    common: { free: '免费', pro: 'PRO', easy: '简单', medium: '中等', hard: '困难', lesson: '课程', xp: 'XP', solved: '已解决', all: '全部' },
    landing: {
      hero: '系统征服\n编程测试',
      heroSub: '从算法到模拟面试，准备编程测试。',
      startFree: '免费开始',
      viewCurriculum: '查看课程',
      featuredTracks: '推荐课程',
      whyTitle: '为什么选择CodePath',
      howTitle: '学习流程',
    },
    dashboard: { title: '仪表板', todayXp: '今日XP', streak: '连续学习', totalSolved: '总解决数', continueLearning: '继续学习', recentActivity: '最近提交' },
    problem: { run: '运行', submit: '提交', hints: '提示', examples: '示例', result: '结果', running: '运行中...' },
  },
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useLocalStorage('cp-lang', detectLang());
  const t = T[lang] || T.ko;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, supported: SUPPORTED }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be inside I18nProvider');
  return ctx;
};
