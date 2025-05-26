import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    // 제목 길이 제한 (한글 고려하여 조금 더 길게)
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 3],

    // 본문 길이 제한
    "body-max-line-length": [2, "always", 100],

    // 타입 제한 (필요한 타입만 허용)
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새로운 기능
        "fix", // 버그 수정
        "docs", // 문서 변경
        "style", // 코드 스타일 변경 (포맷팅, 세미콜론 등)
        "refactor", // 리팩토링
        "test", // 테스트 추가/수정
        "chore", // 빌드 프로세스, 도구 설정 등
        "perf", // 성능 개선
        "ci", // CI 설정 변경
        "build", // 빌드 시스템 변경
        "revert", // 이전 커밋 되돌리기
      ],
    ],

    "subject-case": [0],

    // 제목 끝에 마침표 금지
    "subject-full-stop": [2, "never", "."],

    // 빈 줄 규칙
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],

    // 스코프 규칙 (선택사항)
    "scope-case": [2, "always", "lower-case"],
  },
  prompt: {
    messages: {
      skip: "건너뛰기",
      max: "최대 %d자까지 입력 가능합니다",
      min: "최소 %d자 이상 입력해주세요",
      emptyWarning: "필수 입력 항목입니다",
      upperLimitWarning: "입력 길이가 제한을 초과했습니다",
      lowerLimitWarning: "입력 길이가 최소 요구사항을 충족하지 않습니다",
    },
    questions: {
      type: {
        description: "변경 사항의 타입을 선택하세요",
        enum: {
          feat: {
            description: "새로운 기능 추가",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "버그 수정",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "문서 변경",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description: "코드 스타일 변경 (포맷팅, 세미콜론 등)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description: "리팩토링",
            title: "Code Refactoring",
            emoji: "📦",
          },
          test: {
            description: "테스트 추가/수정",
            title: "Tests",
            emoji: "🚨",
          },
          chore: {
            description: "빌드 프로세스, 도구 설정 등",
            title: "Chores",
            emoji: "♻️",
          },
          perf: {
            description: "성능 개선",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          ci: {
            description: "CI 설정 변경",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          build: {
            description: "빌드 시스템 변경",
            title: "Builds",
            emoji: "🛠",
          },
          revert: {
            description: "이전 커밋 되돌리기",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description: "해결하는 이슈 번호를 입력하세요 (#2) (선택사항)",
      },
      subject: {
        description: "변경 사항에 대한 간단한 설명을 작성하세요",
      },
      body: {
        description: "변경 사항에 대한 자세한 설명을 작성하세요 (선택사항)",
      },
      isBreaking: {
        description: "호환성을 깨뜨리는 변경사항인가요?",
      },
      breakingBody: {
        description: "호환성을 깨뜨리는 변경사항에 대한 설명을 작성하세요",
      },
      breaking: {
        description: "호환성을 깨뜨리는 변경사항을 설명하세요",
      },
      isIssueAffected: {
        description: "이 변경사항이 이슈를 해결하나요?",
      },
      issuesBody: {
        description: "이슈가 해결되는 경우, 이슈에 대한 설명을 작성하세요",
      },
      issues: {
        description: "해결되는 이슈를 추가하세요 (예: 'fix #123', 're #123')",
      },
    },
  },
};

export default config;
