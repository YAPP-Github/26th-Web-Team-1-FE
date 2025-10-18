# Feature-Based Architecture Refactoring Guide

> 이 가이드는 현재 프로젝트의 폴더 구조와 아키텍처 패턴을 일반화하여,
> 다른 Next.js 프로젝트의 리팩토링에 참고할 수 있도록 작성되었습니다.

## 목차

1. [아키텍처 개요](#1-아키텍처-개요)
2. [전체 폴더 구조](#2-전체-폴더-구조)
3. [Feature 모듈 패턴](#3-feature-모듈-패턴)
4. [Shared 모듈 구성](#4-shared-모듈-구성)
5. [App Router 구조](#5-app-router-구조)
6. [파일 네이밍 컨벤션](#6-파일-네이밍-컨벤션)
7. [타입 레이어 구조](#7-타입-레이어-구조)
8. [utils vs lib vs helpers 구분](#8-utils-vs-lib-vs-helpers-구분)
9. [Import 경로 규칙](#9-import-경로-규칙)
10. [마이그레이션 체크리스트](#10-마이그레이션-체크리스트)

---

## 1. 아키텍처 개요

### 핵심 원칙

1. **Feature-Based Architecture**: 도메인별로 완전히 독립된 모듈 구성
2. **Co-location**: 관련 코드는 최대한 가까이 배치
3. **Clear Separation of Concerns**: API Layer, Business Layer, UI Layer 명확한 분리
4. **Type Safety**: DTO와 Domain Model의 명확한 분리
5. **Scalability**: 새로운 기능 추가 시 기존 코드에 영향 최소화

### 레이어 구조

```
┌─────────────────────────────────────────┐
│          App Router (Routes)            │  ← 라우팅과 페이지 레이아웃
├─────────────────────────────────────────┤
│        Feature Modules (Domains)        │  ← 도메인별 비즈니스 로직
│  ┌──────────────────────────────────┐   │
│  │ UI Layer (Components, Hooks)     │   │
│  ├──────────────────────────────────┤   │
│  │ Business Layer (Lib, Helpers)    │   │
│  ├──────────────────────────────────┤   │
│  │ API Layer (API, DTO, Queries)    │   │
│  └──────────────────────────────────┘   │
├─────────────────────────────────────────┤
│     Shared Modules (Common Code)        │  ← 공통 코드 (컴포넌트, 훅, 유틸)
├─────────────────────────────────────────┤
│      Global Types & Middleware          │  ← 전역 타입 및 미들웨어
└─────────────────────────────────────────┘
```

---

## 2. 전체 폴더 구조

### 표준 구조

```
src/
├── app/                         # Next.js App Router
│   ├── (route-group)/          # Route Group (레이아웃 공유용)
│   ├── [dynamic]/              # Dynamic Route
│   ├── layout.tsx              # Root Layout
│   └── globals.css             # Global Styles
│
├── features/                    # Feature 모듈 (도메인별)
│   ├── {domain-1}/             # 예: auth, user, product, order
│   ├── {domain-2}/
│   └── {domain-n}/
│
├── shared/                      # 공유 모듈
│   ├── api/                    # HTTP 클라이언트
│   ├── components/             # 공통 컴포넌트
│   ├── configs/                # 전역 설정
│   ├── constants/              # 전역 상수
│   ├── contexts/               # 전역 React Context
│   ├── hooks/                  # 공통 훅
│   ├── lib/                    # 기술 특화 유틸리티
│   ├── providers/              # Provider 컴포넌트
│   ├── styles/                 # 스타일 유틸리티
│   └── utils/                  # 범용 유틸리티 (필요시)
│
├── types/                       # 전역 타입 정의
│   └── *.d.ts
│
└── middleware.ts               # Next.js Middleware
```

### 폴더별 역할

| 폴더        | 역할                      | 예시                                       |
| ----------- | ------------------------- | ------------------------------------------ |
| `app/`      | 라우팅 및 페이지 레이아웃 | 페이지 컴포넌트, 라우트 그룹, 레이아웃     |
| `features/` | 도메인별 비즈니스 로직    | 기능별 완전히 독립된 모듈                  |
| `shared/`   | 공통 코드                 | 여러 feature에서 사용하는 재사용 가능 코드 |
| `types/`    | 전역 타입                 | 외부 라이브러리 타입 선언, 전역 인터페이스 |

---

## 3. Feature 모듈 패턴

### 표준 Feature 구조

```
features/{domain}/
├── api/                         # API Layer
│   ├── {domain}.api.ts         # HTTP 요청 함수
│   ├── {domain}.dto.ts         # API Request/Response 타입
│   ├── {domain}.queries.ts     # TanStack Query options
│   └── index.ts
│
├── components/                  # UI Layer - 컴포넌트
│   ├── {component-name}.tsx
│   └── index.ts
│
├── hooks/                       # UI Layer - Custom Hooks
│   ├── use-{feature}.ts
│   └── index.ts
│
├── lib/                         # Business Layer - 비즈니스 로직
│   ├── {domain}.mapper.ts      # DTO ↔ Domain Model 변환
│   ├── {domain}.reducer.ts     # 상태 리듀서
│   ├── {domain}.manager.ts     # 싱글톤 매니저
│   ├── {domain}.service.ts     # 복잡한 비즈니스 로직
│   ├── {domain}.factory.ts     # 객체 생성 팩토리
│   └── {domain}.normalizer.ts  # 데이터 정규화
│
├── helpers/                     # Business Layer - 헬퍼 함수
│   ├── {domain}.guards.ts      # 타입 가드
│   ├── {domain}.validators.ts  # 검증 함수
│   ├── {domain}.formatters.ts  # 포맷팅 함수
│   ├── {domain}.calculators.ts # 계산 로직
│   └── {domain}.resolvers.ts   # 값 리졸빙
│
├── types/                       # Domain Model 타입
│   └── {domain}.types.ts
│
├── constants/                   # 도메인 상수
│   └── {domain}.constants.ts
│
├── contexts/                    # React Context (필요시)
│   └── {domain}-context.tsx
│
└── schemas/                     # Validation 스키마 (필요시)
    └── {domain}.schema.ts
```

### Feature 폴더 생성 기준

**새로운 Feature를 만들어야 하는 경우:**

1. **명확한 비즈니스 도메인이 존재하는 경우**

   - 예: 인증(`auth`), 사용자(`user`), 제품(`product`), 주문(`order`)

2. **독립적인 API 엔드포인트를 가지는 경우**

   - 예: `/api/auth`, `/api/products`, `/api/orders`

3. **고유한 데이터 타입과 상태 관리가 필요한 경우**

   - 예: 사용자 정보, 제품 목록, 주문 상태

4. **여러 페이지에서 재사용되는 로직인 경우**
   - 단일 페이지에서만 사용된다면 해당 페이지 폴더에 co-locate

**Feature로 분리하지 않아야 하는 경우:**

1. 공통 UI 컴포넌트 (Button, Modal 등) → `shared/components/`
2. 범용 유틸리티 함수 → `shared/utils/` 또는 `shared/lib/`
3. 단일 페이지에서만 사용되는 컴포넌트 → 해당 페이지 폴더에 co-locate

---

## 4. Shared 모듈 구성

### Shared 폴더 구조

```
shared/
├── api/                        # HTTP 클라이언트
│   └── client.ts              # ky, axios 등 HTTP 클라이언트 설정
│
├── components/                 # 공통 컴포넌트
│   ├── common/                # 범용 컴포넌트
│   │   ├── logo.tsx
│   │   ├── loading-spinner.tsx
│   │   └── error-boundary.tsx
│   ├── external-sdk/          # 외부 SDK 통합
│   │   ├── analytics.tsx
│   │   └── chat-widget.tsx
│   ├── layout/                # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── ui/                    # 기본 UI 컴포넌트
│       ├── button.tsx
│       ├── input.tsx
│       └── modal.tsx
│
├── configs/                    # 전역 설정
│   ├── query/                 # TanStack Query 설정
│   │   └── get-query-client.ts
│   └── seo/                   # SEO 설정
│       └── metadata.ts
│
├── constants/                  # 전역 상수
│   ├── routes.ts              # 라우트 경로
│   ├── api-endpoints.ts       # API 엔드포인트
│   └── app-config.ts          # 앱 설정값
│
├── contexts/                   # 전역 React Context
│   ├── theme-context.tsx
│   └── user-context.tsx
│
├── hooks/                      # 공통 훅
│   ├── use-mobile.ts          # 반응형 훅
│   ├── use-local-storage.ts   # 브라우저 API 훅
│   └── use-debounce.ts        # 범용 훅
│
├── lib/                        # 기술 특화 유틸리티
│   ├── react/                 # React 관련
│   │   └── compose-refs.ts
│   ├── browser/               # 브라우저 API
│   │   ├── cookies.ts
│   │   ├── local-storage.ts
│   │   └── query-string.ts
│   ├── style/                 # 스타일 유틸
│   │   ├── cn.ts             # Tailwind 클래스 병합
│   │   └── tailwind-config.ts
│   ├── api-error/             # API 에러 처리
│   │   ├── error-classes.ts
│   │   ├── error-factory.ts
│   │   └── error-handler.ts
│   ├── external-sdk/          # 외부 SDK
│   │   ├── analytics.ts
│   │   └── logger.ts
│   └── routing/               # 라우팅 유틸
│       └── path-matcher.ts
│
├── providers/                  # Provider 컴포넌트
│   └── index.tsx              # 모든 Provider 조합
│
├── styles/                     # 스타일 유틸리티
│   ├── breakpoint.ts          # 반응형 breakpoint
│   └── theme.ts               # 테마 설정
│
└── utils/                      # 범용 유틸리티 (필요시)
    ├── string.utils.ts        # 문자열 조작
    ├── array.utils.ts         # 배열 조작
    ├── number.utils.ts        # 수학 계산
    └── date.utils.ts          # 날짜 포맷팅
```

### Shared 모듈 배치 기준

| 타입              | 위치                        | 설명                    |
| ----------------- | --------------------------- | ----------------------- |
| 공통 UI 컴포넌트  | `shared/components/ui/`     | Button, Input, Modal 등 |
| 레이아웃 컴포넌트 | `shared/components/layout/` | Header, Sidebar, Footer |
| 공통 비즈니스 훅  | `shared/hooks/`             | 여러 feature에서 사용   |
| HTTP 클라이언트   | `shared/api/`               | axios, ky 등 설정       |
| 전역 상수         | `shared/constants/`         | 라우트, API 경로 등     |
| 기술 특화 유틸    | `shared/lib/`               | React, 브라우저 API 등  |
| 범용 유틸리티     | `shared/utils/`             | 순수 함수 (선택사항)    |

---

## 5. App Router 구조

### 기본 구조

```
app/
├── (route-group)/              # Route Group (레이아웃 공유)
│   ├── layout.tsx             # 그룹 레이아웃
│   └── page.tsx               # 그룹 페이지
│
├── {feature}/                  # Feature별 라우트
│   ├── [id]/                  # Dynamic Route
│   │   └── page.tsx
│   ├── layout.tsx             # Feature 레이아웃
│   └── page.tsx               # Feature 메인 페이지
│
├── layout.tsx                  # Root Layout
├── page.tsx                    # Home Page
├── globals.css                 # Global Styles
└── favicon.ico                 # Favicon
```

### Route Group 활용

Route Group `(name)`을 사용하여 URL에 영향 없이 레이아웃을 공유합니다.

```
app/
├── (auth)/                     # 인증 관련 페이지
│   ├── layout.tsx             # 인증 레이아웃 (로고만 표시)
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
│
├── (main)/                     # 메인 앱 페이지
│   ├── layout.tsx             # 메인 레이아웃 (헤더, 사이드바)
│   ├── dashboard/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
│
└── layout.tsx                  # Root Layout
```

**결과 URL:**

- `/login` (auth 레이아웃)
- `/signup` (auth 레이아웃)
- `/dashboard` (main 레이아웃)
- `/settings` (main 레이아웃)

---

## 6. 파일 네이밍 컨벤션

### Feature 레벨 파일 네이밍

#### API Layer

| 파일명                | 용도                   | 예시              |
| --------------------- | ---------------------- | ----------------- |
| `{domain}.api.ts`     | HTTP 요청 함수         | `user.api.ts`     |
| `{domain}.dto.ts`     | Data Transfer Objects  | `user.dto.ts`     |
| `{domain}.queries.ts` | TanStack Query options | `user.queries.ts` |

```typescript
// user.api.ts
export const getUser = async (id: string): Promise<User> => { ... }

// user.dto.ts
export interface UserResponseDto { ... }

// user.queries.ts
export const userQuery = (id: string) => queryOptions({ ... })
```

#### Business Layer - Lib

| 파일명                   | 용도                 | 예시                    |
| ------------------------ | -------------------- | ----------------------- |
| `{domain}.mapper.ts`     | DTO ↔ Model 변환    | `user.mapper.ts`        |
| `{domain}.reducer.ts`    | 상태 리듀서          | `chat.reducer.ts`       |
| `{domain}.manager.ts`    | 싱글톤 매니저        | `token.manager.ts`      |
| `{domain}.service.ts`    | 복잡한 비즈니스 로직 | `order.service.ts`      |
| `{domain}.factory.ts`    | 객체 생성 팩토리     | `message.factory.ts`    |
| `{domain}.normalizer.ts` | 데이터 정규화        | `message.normalizer.ts` |

```typescript
// user.mapper.ts
export function mapUserFromResponseDto(dto: UserResponseDto): User { ... }

// token.manager.ts
export class TokenManager {
  private static instance: TokenManager;
  static getInstance(): TokenManager { ... }
}

// message.factory.ts
export function createUserMessage(content: string): Message { ... }
```

#### Business Layer - Helpers

| 파일명                    | 용도        | 예시                   |
| ------------------------- | ----------- | ---------------------- |
| `{domain}.guards.ts`      | 타입 가드   | `message.guards.ts`    |
| `{domain}.validators.ts`  | 검증 함수   | `order.validators.ts`  |
| `{domain}.formatters.ts`  | 포맷팅 함수 | `user.formatters.ts`   |
| `{domain}.calculators.ts` | 계산 로직   | `price.calculators.ts` |
| `{domain}.resolvers.ts`   | 값 리졸빙   | `model.resolvers.ts`   |

```typescript
// message.guards.ts
export function isUserMessage(msg: Message): msg is UserMessage { ... }

// price.calculators.ts
export function calculateTotalPrice(items: Item[]): number { ... }

// user.formatters.ts
export function formatUserName(user: User): string { ... }
```

#### Types

| 파일명              | 용도              | 예시            |
| ------------------- | ----------------- | --------------- |
| `{domain}.types.ts` | Domain Model 타입 | `user.types.ts` |

```typescript
// user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
```

### Shared 레벨 파일 네이밍

#### Utils (범용 유틸리티)

| 파일명            | 용도        | 예시           |
| ----------------- | ----------- | -------------- |
| `string.utils.ts` | 문자열 조작 | `capitalize()` |
| `array.utils.ts`  | 배열 조작   | `shuffle()`    |
| `number.utils.ts` | 수학 계산   | `clamp()`      |
| `date.utils.ts`   | 날짜 포맷팅 | `formatDate()` |

### 컴포넌트 네이밍

```
kebab-case.tsx         # 컴포넌트 파일명 (kebab-case)
PascalCase             # 컴포넌트 함수명 (PascalCase)
```

**예시:**

```typescript
// user-profile-card.tsx
export function UserProfileCard() { ... }

// chat-message-list.tsx
export function ChatMessageList() { ... }
```

---

## 7. 타입 레이어 구조

### 3-Layer Type System

```
┌─────────────────────────────────────────┐
│     API DTO Layer (*.dto.ts)            │  ← 백엔드 API 스펙
│  - Request/Response 타입                 │
│  - 백엔드와 1:1 매칭                      │
└─────────────────────────────────────────┘
                   ↕ Mapper
┌─────────────────────────────────────────┐
│  Domain Model Layer (*.types.ts)        │  ← 클라이언트 비즈니스 로직
│  - 프론트엔드 친화적 타입                 │
│  - Date 객체, Discriminated Union 등     │
└─────────────────────────────────────────┘
                   ↕ Usage
┌─────────────────────────────────────────┐
│       UI Layer (Components)             │  ← React 컴포넌트
└─────────────────────────────────────────┘
```

### 레이어별 역할

#### 1. API DTO Layer (`*.dto.ts`)

**역할:** 백엔드 API 스펙과 1:1 매칭되는 타입 정의

```typescript
// user.dto.ts
export interface GetUserResponseDto {
  user_id: string; // 백엔드 snake_case
  user_name: string;
  created_at: string; // ISO 8601 문자열
  is_active: boolean;
}

export interface UpdateUserRequestDto {
  user_name?: string;
  email?: string;
}
```

**특징:**

- 백엔드 네이밍 컨벤션 따름 (snake_case 등)
- 날짜는 문자열로 표현
- 백엔드 스펙 변경 시에만 수정

#### 2. Domain Model Layer (`*.types.ts`)

**역할:** 클라이언트 비즈니스 로직에서 사용하는 타입

```typescript
// user.types.ts
export interface User {
  id: string; // 프론트엔드 camelCase
  name: string;
  createdAt: Date; // Date 객체로 변환
  isActive: boolean;
}

// Discriminated Union 활용
export type Message =
  | { type: "user"; content: string }
  | { type: "assistant"; content: string; model: string };
```

**특징:**

- 프론트엔드 네이밍 컨벤션 (camelCase)
- TypeScript 고급 패턴 활용
- 프론트엔드 개발자 친화적

#### 3. Mapper Layer (`*.mapper.ts`)

**역할:** DTO ↔ Domain Model 간 변환

```typescript
// user.mapper.ts

// GET: Response DTO → Domain Model
export function mapUserFromResponseDto(dto: GetUserResponseDto): User {
  return {
    id: dto.user_id,
    name: dto.user_name,
    createdAt: new Date(dto.created_at),
    isActive: dto.is_active,
  };
}

// POST: Domain Model → Request DTO
export function mapUserToRequestDto(user: Partial<User>): UpdateUserRequestDto {
  return {
    user_name: user.name,
    email: user.email,
  };
}
```

### Mapper 네이밍 컨벤션

```typescript
// GET: Response DTO → Domain Model
mapXXXFromResponseDto(dto: XXXResponseDto): XXXModel

// POST: Domain Model → Request DTO
mapXXXToRequestDto(model: XXXModel): XXXRequestDto

// 배열 변환
mapXXXListFromResponseDto(dtos: XXXResponseDto[]): XXXModel[]
```

### 변환 시점 원칙

#### GET 요청 (조회)

**API Layer에서 mapper 호출** → Domain Model 반환

```typescript
// user.api.ts
export const getUser = async (id: string): Promise<User> => {
  const dto = await http.get<GetUserResponseDto>(`/users/${id}`);
  return mapUserFromResponseDto(dto); // ✅ API Layer에서 변환
};

// user.queries.ts
export const userQuery = (id: string) =>
  queryOptions({
    queryKey: ["user", id],
    queryFn: () => getUser(id), // 이미 Domain Model
  });
```

**장점:**

- Query Hook에서 `select` 불필요
- refetch 시 재변환 없음 (성능 향상)
- 코드 간결성

#### POST 요청 (생성/수정)

**Mutation Hook에서 mapper 호출** → API 함수는 DTO만 받음

```typescript
// user.api.ts
export const updateUser = async (
  id: string,
  request: UpdateUserRequestDto // DTO만 받음
): Promise<void> => {
  await http.patch(`/users/${id}`, { json: request });
};

// use-update-user.ts
export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: Partial<User> }) => {
      const request = mapUserToRequestDto(user); // ✅ Hook에서 변환
      return updateUser(id, request);
    },
  });
}
```

**장점:**

- API 함수는 순수하게 DTO만 처리
- Mutation 로직에서 유연한 데이터 조작 가능

### Mapper 작성 규칙

1. **순수 함수만 사용**

   ```typescript
   // ✅ 권장: 순수 함수
   export function mapUserFromDto(dto: UserDto): User { ... }

   // ❌ 금지: Class 기반
   export class UserTransformer {
     static fromDto(dto: UserDto): User { ... }
   }
   ```

2. **파일 위치**

   - `features/{domain}/lib/{domain}.mapper.ts`

3. **타입 안전성**
   - 명시적 타입 선언 필수
   - 불변성 유지 (원본 객체 변경 금지)

---

## 8. utils vs lib vs helpers 구분

### 의사결정 플로우

```
새로운 함수/코드를 작성했다
    ↓
1. 다른 프로젝트에서도 그대로 쓸 수 있나?
    YES → utils/
    NO ↓

2. React, DOM, localStorage 같은 특정 기술에 의존하나?
    YES → lib/ (기술 특화)
    NO ↓

3. 비즈니스 로직 레이어인가? (Mapper, Reducer, Manager, Service, Factory)
    YES → lib/ (비즈니스 로직)
    NO ↓

4. 우리 도메인 지식이 필요한가? (타입 가드, 검증, 포맷팅)
    YES → helpers/
    NO ↓

5. 애매하다
    → 기본값: helpers/ (더 가벼운 쪽으로)
```

### 1. utils/ - 범용 유틸리티

**정의:** 프로젝트와 무관하게 다른 곳에서도 사용 가능한 순수 함수

**특징:**

- 비즈니스 로직이나 특정 기술에 의존하지 않음
- lodash, ramda와 같은 유틸리티 라이브러리 성격
- 프로젝트 간 복사해도 바로 동작

**예시:**

```typescript
// shared/utils/string.utils.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

// shared/utils/array.utils.ts
export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// shared/utils/number.utils.ts
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

### 2. lib/ - 기술 특화 유틸리티 & 비즈니스 로직 레이어

**정의:** 특정 라이브러리/기술에 의존하거나 비즈니스 로직을 담당

#### A. Shared 레벨 lib: 기술 특화 유틸리티

**특징:**

- React, DOM, localStorage 등 특정 기술에 의존
- 동일한 기술 스택이 필요

**예시:**

```typescript
// shared/lib/react/compose-refs.ts (React 특화)
export function composeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<T>).current = node;
    });
  };
}

// shared/lib/browser/cookies.ts (브라우저 API)
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

// shared/lib/style/cn.ts (Tailwind 특화)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

#### B. Features 레벨 lib: 비즈니스 로직 레이어

**특징:**

- 도메인 비즈니스 로직 처리
- 아키텍처 패턴 (Mapper, Reducer, Manager, Service, Factory)

**예시:**

```typescript
// features/chat/lib/chat.mapper.ts (Mapper)
export function mapChatFromDto(dto: ChatResponseDto): Chat {
  return {
    id: dto.chat_id,
    messages: dto.messages.map(mapMessageFromDto),
    createdAt: new Date(dto.created_at),
  };
}

// features/chat/lib/chat.reducer.ts (Reducer)
export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
}

// features/auth/lib/token.manager.ts (Manager - 싱글톤)
export class TokenManager {
  private static instance: TokenManager;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getAccessToken(): string | null { ... }
  setAccessToken(token: string): void { ... }
}

// features/order/lib/order.service.ts (Service)
export class OrderService {
  async processCheckout(order: Order): Promise<CheckoutResult> {
    // 복잡한 비즈니스 로직
    const validated = await this.validateOrder(order);
    const payment = await this.processPayment(validated);
    return this.createInvoice(payment);
  }
}

// features/chat/lib/message.factory.ts (Factory)
export function createUserMessage(content: string): UserMessage {
  return {
    type: 'user',
    content,
    id: generateId(),
    timestamp: new Date(),
  };
}
```

### 3. helpers/ - 비즈니스 헬퍼 함수

**정의:** 도메인 특화된 순수 함수 (타입 가드, 검증, 포맷팅)

**특징:**

- 도메인 지식 필요
- 순수 함수
- 프로젝트 컨텍스트에 강하게 결합

**예시:**

```typescript
// features/chat/helpers/message.guards.ts (타입 가드)
export function isUserMessage(msg: Message): msg is UserMessage {
  return msg.type === "user";
}

export function isAssistantMessage(msg: Message): msg is AssistantMessage {
  return msg.type === "assistant";
}

// features/order/helpers/order.validators.ts (검증)
export function canCheckout(order: Order): boolean {
  return order.items.length > 0 && order.totalPrice > 0;
}

export function isValidShippingAddress(address: Address): boolean {
  return Boolean(address.street && address.city && address.zipCode);
}

// features/user/helpers/user.formatters.ts (포맷팅)
export function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export function getUserInitials(user: User): string {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
}

// features/enhancing/helpers/progress.calculators.ts (계산)
export function calculateProgress(current: number, total: number): number {
  return Math.round((current / total) * 100);
}

export function getProgressColor(progress: number): string {
  if (progress < 30) return "red";
  if (progress < 70) return "yellow";
  return "green";
}

// features/models/helpers/model.resolvers.ts (리졸빙)
export function getModelInfo(modelId: string): ModelInfo {
  return MODEL_REGISTRY[modelId] ?? DEFAULT_MODEL_INFO;
}
```

### 실전 예시 비교표

| 함수/코드                    | 분류    | 위치                                                 | 이유             |
| ---------------------------- | ------- | ---------------------------------------------------- | ---------------- |
| `clamp(n, min, max)`         | utils   | `shared/utils/number.utils.ts`                       | 범용 수학 함수   |
| `capitalize(str)`            | utils   | `shared/utils/string.utils.ts`                       | 범용 문자열 함수 |
| `composeRefs(...refs)`       | lib     | `shared/lib/react/compose-refs.ts`                   | React 특화       |
| `cn(...classes)`             | lib     | `shared/lib/style/cn.ts`                             | Tailwind 특화    |
| `getCookie(key)`             | lib     | `shared/lib/browser/cookies.ts`                      | 브라우저 API     |
| `mapChatFromDto(dto)`        | lib     | `features/chat/lib/chat.mapper.ts`                   | Mapper 패턴      |
| `chatReducer(state, action)` | lib     | `features/chat/lib/chat.reducer.ts`                  | Reducer 패턴     |
| `tokenManager`               | lib     | `features/auth/lib/token.manager.ts`                 | 싱글톤 Manager   |
| `isUserMessage(msg)`         | helpers | `features/chat/helpers/message.guards.ts`            | 도메인 타입 가드 |
| `calculateProgress(count)`   | helpers | `features/enhancing/helpers/progress.calculators.ts` | 도메인 계산      |
| `formatUserName(user)`       | helpers | `features/user/helpers/user.formatters.ts`           | 도메인 포맷터    |

---

## 9. Import 경로 규칙

### Path Alias 설정

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

### Import 순서

```typescript
// 1. External libraries
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. Shared modules
import { cn } from "@/shared/lib/style/cn";
import { Button } from "@/shared/components/ui/button";

// 3. Feature modules (같은 feature 내부)
import { userQuery } from "../api/user.queries";
import { mapUserFromDto } from "../lib/user.mapper";
import { isActiveUser } from "../helpers/user.guards";

// 4. Relative imports (같은 폴더)
import { UserCard } from "./user-card";
```

### Feature 간 Import 규칙

**원칙:** Feature 간 직접 Import는 최소화

```typescript
// ❌ 나쁨: Feature 간 직접 의존
import { getChatMessages } from "@/features/chat/api/chat.api";

// ✅ 좋음: Shared 통해 공유
// shared/api/client.ts를 통해 공통 로직 공유
// 또는 각 feature가 독립적으로 API 호출
```

**Feature 간 데이터 공유 방법:**

1. **Props를 통한 전달** (권장)

   ```typescript
   <ChatContainer userId={user.id} />
   ```

2. **React Context 사용** (전역 상태 필요 시)

   ```typescript
   // shared/contexts/user-context.tsx
   export const UserContext = createContext<User | null>(null);
   ```

3. **TanStack Query Cache 공유**

   ```typescript
   // 다른 feature에서 user 데이터 접근
   const queryClient = useQueryClient();
   const user = queryClient.getQueryData(["user", userId]);
   ```

---

## 10. 마이그레이션 체크리스트

### Phase 1: 프로젝트 분석 (1-2일)

- [ ] 현재 프로젝트의 폴더 구조 파악
- [ ] 주요 비즈니스 도메인 식별 (예: auth, user, product, order)
- [ ] 공통 컴포넌트 및 유틸리티 식별
- [ ] API 엔드포인트 및 데이터 흐름 분석
- [ ] 의존성 관계 매핑

### Phase 2: 폴더 구조 설계 (1일)

- [ ] `src/` 폴더 생성
- [ ] `src/features/` 폴더 및 도메인별 하위 폴더 생성
- [ ] `src/shared/` 폴더 및 하위 구조 생성
- [ ] `src/app/` 라우팅 구조 설계
- [ ] Path alias 설정 (`tsconfig.json`)

### Phase 3: Shared 모듈 마이그레이션 (2-3일)

- [ ] HTTP 클라이언트 설정 (`shared/api/client.ts`)
- [ ] 공통 UI 컴포넌트 이동 (`shared/components/ui/`)
- [ ] 레이아웃 컴포넌트 이동 (`shared/components/layout/`)
- [ ] 공통 훅 이동 (`shared/hooks/`)
- [ ] 기술 특화 유틸리티 정리 (`shared/lib/`)
- [ ] 범용 유틸리티 정리 (`shared/utils/`)
- [ ] 전역 상수 정리 (`shared/constants/`)
- [ ] Provider 컴포넌트 구성 (`shared/providers/`)

### Phase 4: Feature 모듈 마이그레이션 (3-5일 per feature)

각 feature별로 순차적으로 진행:

- [ ] **API Layer 구성**

  - [ ] `{domain}.dto.ts` 작성 (백엔드 API 스펙)
  - [ ] `{domain}.api.ts` 작성 (HTTP 요청 함수)
  - [ ] `{domain}.queries.ts` 작성 (TanStack Query)

- [ ] **Business Layer 구성**

  - [ ] `{domain}.mapper.ts` 작성 (DTO ↔ Model 변환)
  - [ ] `{domain}.reducer.ts` 작성 (필요시)
  - [ ] `{domain}.manager.ts` 작성 (필요시)
  - [ ] `{domain}.guards.ts` 작성 (타입 가드)
  - [ ] `{domain}.validators.ts` 작성 (검증 함수)
  - [ ] `{domain}.formatters.ts` 작성 (포맷팅)

- [ ] **UI Layer 구성**

  - [ ] 컴포넌트 이동 (`components/`)
  - [ ] 훅 이동 (`hooks/`)

- [ ] **타입 정의**
  - [ ] `{domain}.types.ts` 작성 (Domain Model)

### Phase 5: App Router 마이그레이션 (2-3일)

- [ ] Route Group 구성 (필요시)
- [ ] 페이지 컴포넌트 이동
- [ ] 레이아웃 컴포넌트 구성
- [ ] Metadata 설정
- [ ] Error Boundary 설정

### Phase 6: 테스트 및 리팩토링 (3-5일)

- [ ] Import 경로 수정 (Path Alias 적용)
- [ ] 순환 의존성 제거
- [ ] Feature 간 직접 Import 제거
- [ ] 타입 에러 수정
- [ ] 빌드 테스트
- [ ] 단위 테스트 작성/수정
- [ ] E2E 테스트 확인

### Phase 7: 문서화 (1일)

- [ ] 폴더 구조 문서 작성
- [ ] 컨벤션 가이드 작성
- [ ] API 레이어 사용법 문서화
- [ ] 새 팀원 온보딩 가이드 작성

### 마이그레이션 우선순위

1. **High Priority** (먼저 마이그레이션)

   - Shared 모듈 (HTTP 클라이언트, 공통 컴포넌트)
   - 인증 Feature (auth)
   - 핵심 비즈니스 Feature

2. **Medium Priority**

   - 부가 기능 Feature
   - 레이아웃 및 UI 개선

3. **Low Priority** (나중에 마이그레이션)
   - 레거시 코드
   - 사용 빈도 낮은 Feature

---

## 추가 고려사항

### 1. TanStack Query 통합

```typescript
// shared/configs/query/get-query-client.ts
import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60초
        gcTime: 10 * 60 * 1000, // 10분
      },
    },
  });
}
```

### 2. Error Handling

```typescript
// shared/lib/api-error/error-handler.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (error instanceof HTTPError) {
    return new ApiError(error.response.status, error.message);
  }
  return new ApiError(500, "Unknown error");
}
```

### 3. Middleware

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
};
```

### 4. 환경 변수 관리

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_ENV=development
```

```typescript
// shared/configs/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  appEnv: process.env.NEXT_PUBLIC_APP_ENV!,
};
```

---

## 결론

이 가이드는 Feature-Based Architecture를 기반으로 한 확장 가능하고 유지보수하기 쉬운 프로젝트 구조를 제시합니다.

**핵심 원칙:**

1. **명확한 레이어 분리**: API, Business, UI 레이어
2. **도메인 독립성**: Feature 모듈은 서로 독립적
3. **타입 안전성**: DTO와 Domain Model 분리
4. **Co-location**: 관련 코드는 가까이
5. **확장성**: 새 기능 추가 시 기존 코드 영향 최소화

이 구조를 따르면 팀원 간 협업이 원활해지고, 코드베이스가 일관되며, 장기적으로 유지보수 비용이 절감됩니다.

---

## 참고 자료

- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
