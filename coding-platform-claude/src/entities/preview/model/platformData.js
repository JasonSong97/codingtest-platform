// ──────────────────────────────────────────────────────
//  platformData.js  —  전체 더미 데이터
// ──────────────────────────────────────────────────────

export const TRACKS = [
  {
    id: 'track-algo-basic',
    slug: 'algorithm-basics',
    title: '알고리즘 기초',
    titleEn: 'Algorithm Basics',
    description: '코딩 테스트 필수 알고리즘을 체계적으로 학습합니다. 완전탐색부터 동적 프로그래밍까지.',
    level: 'beginner',
    isFree: true,
    totalLessons: 24,
    learners: 18420,
    progress: 33,
    tags: ['완전탐색', '정렬', 'BFS/DFS', 'DP'],
    chapters: [
      {
        id: 'ch-1', title: '완전탐색', lessonCount: 6, completed: 6,
        lessons: [
          { id: 'l-1', slug: 'brute-force-intro', title: '완전탐색 개요', status: 'completed' },
          { id: 'l-2', slug: 'permutation', title: '순열과 조합', status: 'completed' },
          { id: 'l-3', slug: 'recursion', title: '재귀 함수', status: 'completed' },
          { id: 'l-4', slug: 'backtracking', title: '백트래킹', status: 'completed' },
          { id: 'l-5', slug: 'two-pointer', title: '투 포인터', status: 'completed' },
          { id: 'l-6', slug: 'sliding-window', title: '슬라이딩 윈도우', status: 'completed' },
        ]
      },
      {
        id: 'ch-2', title: '정렬과 이진탐색', lessonCount: 6, completed: 2,
        lessons: [
          { id: 'l-7', slug: 'sort-basics', title: '정렬 알고리즘', status: 'completed' },
          { id: 'l-8', slug: 'binary-search', title: '이진 탐색', status: 'current' },
          { id: 'l-9', slug: 'parametric-search', title: '파라메트릭 서치', status: 'locked' },
          { id: 'l-10', slug: 'counting-sort', title: '카운팅 정렬', status: 'locked' },
          { id: 'l-11', slug: 'sort-app', title: '정렬 응용', status: 'locked' },
          { id: 'l-12', slug: 'sort-review', title: '정렬 종합 문제', status: 'locked' },
        ]
      },
      {
        id: 'ch-3', title: 'BFS / DFS', lessonCount: 6, completed: 0,
        lessons: [
          { id: 'l-13', slug: 'graph-basic', title: '그래프 기초', status: 'locked' },
          { id: 'l-14', slug: 'bfs', title: 'BFS 너비우선탐색', status: 'locked' },
          { id: 'l-15', slug: 'dfs', title: 'DFS 깊이우선탐색', status: 'locked' },
          { id: 'l-16', slug: 'flood-fill', title: '플러드 필', status: 'locked' },
          { id: 'l-17', slug: 'shortest-path', title: '최단 경로', status: 'locked' },
          { id: 'l-18', slug: 'graph-review', title: '그래프 종합', status: 'locked' },
        ]
      },
      {
        id: 'ch-4', title: '동적 프로그래밍', lessonCount: 6, completed: 0,
        lessons: [
          { id: 'l-19', slug: 'dp-intro', title: 'DP 개론', status: 'locked' },
          { id: 'l-20', slug: 'knapsack', title: '배낭 문제', status: 'locked' },
          { id: 'l-21', slug: 'lcs', title: 'LCS/LIS', status: 'locked' },
          { id: 'l-22', slug: 'dp-string', title: '문자열 DP', status: 'locked' },
          { id: 'l-23', slug: 'dp-tree', title: '트리 DP', status: 'locked' },
          { id: 'l-24', slug: 'dp-review', title: 'DP 종합', status: 'locked' },
        ]
      },
    ],
    currentUnitSlug: 'binary-search',
    nextPath: '/unit/binary-search',
  },
  {
    id: 'track-ds',
    slug: 'data-structures',
    title: '자료구조 마스터',
    titleEn: 'Data Structures',
    description: '스택, 큐, 트리, 힙, 해시 등 핵심 자료구조를 코딩 테스트 관점에서 완벽 정복합니다.',
    level: 'intermediate',
    isFree: false,
    totalLessons: 32,
    learners: 9821,
    progress: 0,
    tags: ['스택/큐', '트리', '힙', '해시맵'],
    chapters: [
      { id: 'ch-5', title: '선형 자료구조', lessonCount: 8, completed: 0, lessons: [] },
      { id: 'ch-6', title: '트리 구조', lessonCount: 8, completed: 0, lessons: [] },
      { id: 'ch-7', title: '힙과 우선순위 큐', lessonCount: 8, completed: 0, lessons: [] },
      { id: 'ch-8', title: '해시와 집합', lessonCount: 8, completed: 0, lessons: [] },
    ],
    currentUnitSlug: null,
    nextPath: '/unit/stack-queue-intro',
  },
  {
    id: 'track-mock',
    slug: 'mock-interview',
    title: '모의 코딩 테스트',
    titleEn: 'Mock Interviews',
    description: '카카오, 네이버, 라인 등 국내 주요 기업 기출 문제를 실전 환경으로 풀어봅니다.',
    level: 'advanced',
    isFree: false,
    totalLessons: 40,
    learners: 5234,
    progress: 0,
    tags: ['카카오', '네이버', '라인', 'SK'],
    chapters: [],
    currentUnitSlug: null,
    nextPath: null,
  },
];

export const LESSONS = {
  'binary-search': {
    id: 'l-8',
    slug: 'binary-search',
    title: '이진 탐색 (Binary Search)',
    trackId: 'track-algo-basic',
    chapterId: 'ch-2',
    estimatedMin: 35,
    xp: 120,
    description: `이진 탐색은 정렬된 배열에서 특정 값을 찾는 효율적인 탐색 알고리즘입니다. 
매 단계마다 탐색 범위를 절반으로 줄여나가기 때문에 시간복잡도 O(log n)으로 동작합니다.

선형 탐색이 O(n)인 반면, 이진 탐색은 1억 개의 데이터에서도 약 27번의 비교만으로 원하는 값을 찾을 수 있습니다.`,
    keyConcepts: [
      '정렬된 배열에서만 사용 가능',
      '시간복잡도 O(log n)',
      'left, right, mid 포인터 관리',
      '오프바이원 에러 주의 (≤ vs <)',
      '파라메트릭 서치로 확장 가능',
    ],
    exampleCode: {
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # 찾지 못한 경우

# 사용 예시
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # → 3
print(binary_search(arr, 10))  # → -1`,
      javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(arr, 7));   // 3
console.log(binarySearch(arr, 10));  // -1`,
      java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}`,
    },
    problems: [
      {
        id: 'p-bs-1',
        slug: 'find-target-index',
        title: '정렬 배열에서 타겟 찾기',
        difficulty: 'easy',
        passRate: 82,
        languages: ['python', 'javascript', 'java'],
        xp: 50,
      },
      {
        id: 'p-bs-2',
        slug: 'search-range',
        title: '범위 탐색 (Lower/Upper Bound)',
        difficulty: 'medium',
        passRate: 61,
        languages: ['python', 'javascript', 'java', 'cpp'],
        xp: 100,
      },
      {
        id: 'p-bs-3',
        slug: 'rotate-search',
        title: '회전 배열 탐색',
        difficulty: 'hard',
        passRate: 38,
        languages: ['python', 'javascript'],
        xp: 200,
      },
    ],
    notes: `**꼭 기억할 것:**
- while 조건: \`left <= right\` (등호 포함!)
- mid 계산: \`(left + right) // 2\` (정수 나눗셈)
- 오른쪽 탐색: \`left = mid + 1\`
- 왼쪽 탐색: \`right = mid - 1\`

**파이썬 bisect 모듈 활용:**
\`\`\`
import bisect
bisect.bisect_left(arr, x)   # lower bound
bisect.bisect_right(arr, x)  # upper bound
\`\`\``,
  },
};

export const PROBLEMS = {
  'find-target-index': {
    id: 'p-bs-1',
    slug: 'find-target-index',
    unitSlug: 'binary-search',
    title: '정렬 배열에서 타겟 찾기',
    difficulty: 'easy',
    xp: 50,
    passRate: 82,
    description: `정렬된 정수 배열 \`nums\`와 정수 \`target\`이 주어집니다.

\`target\`이 \`nums\`에 존재한다면 그 인덱스를, 존재하지 않는다면 \`-1\`을 반환하세요.

**반드시 O(log n) 시간복잡도로 구현해야 합니다.**`,
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      'nums는 오름차순 정렬되어 있음',
      '중복 원소 없음',
    ],
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12]\ntarget = 9', output: '4', explanation: '9는 인덱스 4에 있음' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12]\ntarget = 2', output: '-1', explanation: '2는 배열에 없음' },
    ],
    hints: [
      '이진 탐색의 기본 구조: left, right 포인터와 while 루프',
      'mid = (left + right) // 2 로 중간 인덱스 계산',
      'nums[mid] < target 이면 left = mid + 1, 아니면 right = mid - 1',
    ],
    starterCode: {
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # 여기에 코드를 작성하세요
        pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // 여기에 코드를 작성하세요
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // 여기에 코드를 작성하세요
        return -1;
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 여기에 코드를 작성하세요
        return -1;
    }
};`,
    },
  },
  'search-range': {
    id: 'p-bs-2',
    slug: 'search-range',
    unitSlug: 'binary-search',
    title: '범위 탐색 (Lower/Upper Bound)',
    difficulty: 'medium',
    xp: 100,
    passRate: 61,
    description: `정렬된 정수 배열 \`nums\`와 정수 \`target\`이 주어집니다.

\`target\`의 시작 인덱스와 끝 인덱스를 \`[start, end]\` 형태로 반환하세요. 없으면 \`[-1, -1]\`을 반환하세요.

**O(log n) 시간복잡도로 구현해야 합니다.**`,
    constraints: [
      '0 ≤ nums.length ≤ 10⁵',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      'nums는 오름차순 정렬',
    ],
    examples: [
      { input: 'nums = [5, 7, 7, 8, 8, 10]\ntarget = 8', output: '[3, 4]' },
      { input: 'nums = [5, 7, 7, 8, 8, 10]\ntarget = 6', output: '[-1, -1]' },
    ],
    hints: [
      'Lower bound와 Upper bound를 각각 구하는 이진 탐색 2회 수행',
      'Lower bound: target 이상의 첫 번째 인덱스',
      'Upper bound: target 초과의 첫 번째 인덱스',
    ],
    starterCode: {
      python: `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        # 여기에 코드를 작성하세요
        pass`,
      javascript: `var searchRange = function(nums, target) {
    // 여기에 코드를 작성하세요
};`,
      java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{-1, -1};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        return {-1, -1};
    }
};`,
    },
  },
};

export const DASHBOARD_DATA = {
  todayXp: { current: 80, goal: 150 },
  streak: 7,
  totalSolved: 42,
  weeklyActivity: [3, 5, 2, 8, 4, 6, 3],
  recommendedTrack: TRACKS[0],
  currentLesson: { title: '이진 탐색', slug: 'binary-search', unitSlug: 'binary-search', xp: 120 },
  recentSubmissions: [
    { id: 's1', problem: '완전탐색 N-Queens', status: 'accepted', lang: 'Python', time: '120ms', date: '2026-03-06' },
    { id: 's2', problem: '투 포인터 합산', status: 'accepted', lang: 'Python', time: '88ms', date: '2026-03-05' },
    { id: 's3', problem: '슬라이딩 윈도우 최대합', status: 'wrong', lang: 'JavaScript', time: '—', date: '2026-03-05' },
    { id: 's4', problem: '재귀 피보나치', status: 'accepted', lang: 'Java', time: '54ms', date: '2026-03-04' },
    { id: 's5', problem: '백트래킹 부분합', status: 'timeout', lang: 'Python', time: '>2000ms', date: '2026-03-03' },
  ],
};

export const PRICING_PLANS = [
  {
    id: 'free',
    name: '무료',
    period: null,
    originalPrice: null,
    price: 0,
    discount: null,
    badge: null,
    features: ['알고리즘 기초 트랙 전체', '기초 문제 50개', '커뮤니티 접근', '기본 통계'],
    cta: '무료로 시작',
    highlight: false,
  },
  {
    id: 'monthly',
    name: '월간 구독',
    period: '1개월',
    originalPrice: 30000,
    price: 30000,
    discount: 0,
    badge: null,
    features: ['전체 트랙 무제한', '문제 500개+', '힌트 & 해설', '제출 기록 무제한', 'AI 코드 피드백'],
    cta: '월간 시작하기',
    highlight: false,
  },
  {
    id: 'yearly',
    name: '연간 구독',
    period: '12개월',
    originalPrice: 360000,
    price: 180000,
    discount: 50,
    badge: '🔥 Best Value',
    features: ['전체 트랙 무제한', '문제 500개+', '힌트 & 해설', '제출 기록 무제한', 'AI 코드 피드백', '모의 인터뷰 20회', '1:1 코드 리뷰 2회'],
    cta: '연간 시작하기',
    highlight: true,
  },
];

export const PAYMENT_METHODS = [
  { id: 'card', name: '신용/체크카드', icon: '💳', desc: 'VISA, MasterCard, 국내 카드 모두 가능' },
  { id: 'kakao', name: '카카오페이', icon: '🟡', desc: '카카오 계정으로 간편 결제' },
  { id: 'toss', name: '토스페이', icon: '🔵', desc: '토스 앱으로 간편 결제' },
  { id: 'bank', name: '무통장 입금', icon: '🏦', desc: '입금 확인 후 즉시 활성화' },
];

export const REVIEWS = [
  { id: 'r1', user: '김개발', avatar: '👨‍💻', rating: 5, date: '2026-02-28', text: '체계적인 커리큘럼 덕분에 카카오 코딩테스트를 통과했습니다! 특히 DP 파트가 정말 잘 되어 있어요.', recommend: true },
  { id: 'r2', user: '이코딩', avatar: '👩‍💻', rating: 5, date: '2026-02-20', text: '기존에 여러 플랫폼을 써봤는데 여기가 설명이 제일 친절합니다. 초보자도 쉽게 따라갈 수 있어요.', recommend: true },
  { id: 'r3', user: '박알고', avatar: '🧑‍💻', rating: 4, date: '2026-02-15', text: '문제 퀄리티가 좋고 난이도 배분이 적절합니다. 다만 문제 수가 조금 더 늘었으면 좋겠어요.', recommend: true },
  { id: 'r4', user: '최테크', avatar: '👨‍🔬', rating: 3, date: '2026-02-10', text: '전반적으로 좋지만 일부 설명이 부족한 부분이 있습니다. 개선되면 더 좋을 것 같아요.', recommend: false },
  { id: 'r5', user: '정서버', avatar: '👩‍🔬', rating: 5, date: '2026-02-05', text: '네이버 코딩테스트 최종 합격했습니다! 이 플랫폼 없이는 불가능했을 것 같아요. 강력 추천!', recommend: true },
];

export const INVITE_POLICY = {
  inviterReward: 7000,
  inviteeReward: 3000,
  maxInvites: 10,
  steps: [
    { step: 1, title: '초대 링크 공유', desc: '친구에게 나만의 초대 코드를 전달하세요' },
    { step: 2, title: '친구 가입', desc: '초대 코드로 가입하면 친구에게 3,000P 지급' },
    { step: 3, title: '보상 수령', desc: '친구 첫 결제 시 나에게 7,000P 지급' },
  ],
  faq: [
    { q: '초대 보상은 언제 지급되나요?', a: '친구가 최초 유료 플랜을 결제한 시점으로부터 영업일 기준 1일 이내 포인트로 지급됩니다.' },
    { q: '초대 인원 제한이 있나요?', a: '계정 당 최대 10명까지 초대 보상을 받을 수 있습니다.' },
    { q: '포인트 유효기간이 있나요?', a: '적립일로부터 1년 이내에 사용해야 합니다.' },
  ],
};

export const SETTINGS_MENU = [
  { id: 'account', label: '계정', icon: '👤' },
  { id: 'membership', label: '멤버십', icon: '⭐' },
  { id: 'email', label: '이메일', icon: '✉️' },
  { id: 'social', label: '소셜 로그인', icon: '🔗' },
  { id: 'password', label: '비밀번호', icon: '🔒' },
  { id: 'notifications', label: '알림', icon: '🔔' },
  { id: 'preferences', label: '환경 설정', icon: '⚙️' },
  { id: 'submissions', label: '제출 기록', icon: '📋' },
];

export const SUBMISSION_HISTORY = [
  { id: 'sub1', problem: '완전탐색 N-Queens', status: 'accepted', lang: 'Python', runtime: '120ms', memory: '14.2MB', date: '2026-03-06 14:32' },
  { id: 'sub2', problem: '투 포인터 합산', status: 'accepted', lang: 'Python', runtime: '88ms', memory: '13.8MB', date: '2026-03-05 21:14' },
  { id: 'sub3', problem: '슬라이딩 윈도우 최대합', status: 'wrong', lang: 'JavaScript', runtime: '—', memory: '—', date: '2026-03-05 20:48' },
  { id: 'sub4', problem: '재귀 피보나치', status: 'accepted', lang: 'Java', runtime: '54ms', memory: '11.2MB', date: '2026-03-04 18:55' },
  { id: 'sub5', problem: '백트래킹 부분합', status: 'timeout', lang: 'Python', runtime: '>2000ms', memory: '—', date: '2026-03-03 22:10' },
  { id: 'sub6', problem: '정렬 배열 이진탐색', status: 'accepted', lang: 'Python', runtime: '64ms', memory: '12.1MB', date: '2026-03-03 19:25' },
];

export const POINT_LEDGER = [
  { id: 'pt1', desc: '일일 학습 달성 보너스', amount: +50, balance: 350, date: '2026-03-06' },
  { id: 'pt2', desc: '문제 풀이 XP 전환', amount: +120, balance: 300, date: '2026-03-05' },
  { id: 'pt3', desc: '연속 7일 출석 보너스', amount: +200, balance: 180, date: '2026-03-04' },
  { id: 'pt4', desc: '월간 구독 결제', amount: -19900, balance: -20, date: '2026-03-01' },
  { id: 'pt5', desc: '가입 축하 포인트', amount: +20000, balance: 19880, date: '2026-02-01' },
];
