# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"잇다" (eatda) - A Next.js 15 web application for recording and supporting neighborhood restaurants and small businesses that shouldn't disappear.

**Tech Stack:** Next.js 15.3.2, React 19, TypeScript 5, Vanilla Extract (CSS-in-TS), TanStack React Query, ky (HTTP client), iron-session, pnpm 9.7.0

## Development Commands

### Core Commands

```bash
# Development
pnpm dev                    # Start development server
pnpm dev:msw               # Start development server with MSW mocking enabled
pnpm build                 # Build for production
pnpm start                 # Start production server

# Testing
pnpm test                  # Run unit tests with Vitest
npx playwright test        # Run E2E tests with Playwright

# Code Quality
pnpm lint                  # Run ESLint
pnpm lint:staged          # Run lint-staged on staged files
pnpm format               # Format code with Prettier
pnpm format:check         # Check code formatting

# Git
pnpm commit               # Use Commitizen for conventional commits

# Storybook
pnpm storybook            # Start Storybook dev server on port 6006
pnpm build-storybook      # Build Storybook for production
```

## Architecture

### Hybrid Architecture: Co-location + Feature-Based + Shared

This codebase is transitioning to a **hybrid architecture** that combines:

1. **Co-location Pattern** - Related files placed close to where they're used (within `app/` routes)
2. **Feature-Based Architecture** - Reusable domain logic extracted to `src/features/`
3. **Shared Modules** - Technology-specific utilities and common code in `src/shared/`

### Feature-Based Structure (`src/features/`)

For features used across multiple pages, use the `src/features/{domain}/` structure following REFACTORING_GUIDE.md:

```
src/features/{domain}/
├── api/                    # API Layer
│   ├── {domain}.api.ts    # HTTP request functions
│   ├── {domain}.dto.ts    # Data Transfer Objects (Request/Response types)
│   ├── {domain}.queries.ts # TanStack Query options & mutations
│   └── index.ts           # Public API exports
├── lib/                   # Business Layer (when needed)
│   └── {domain}.mapper.ts # DTO ↔ Domain Model transformation
├── helpers/               # Helper functions (when needed)
│   ├── {domain}.guards.ts    # Type guards
│   ├── {domain}.validators.ts # Validation functions
│   └── {domain}.formatters.ts # Formatting functions
└── types/                 # Domain Model types (when needed)
    └── {domain}.types.ts
```

**Current Features:**

- `auth/` - Authentication & session management (login, logout, token refresh)

**When to create a new feature:**

- Reusable across multiple pages/routes
- Has independent API endpoints
- Requires unique data types and state management
- Contains complex business logic

**When NOT to create a feature:**

- Single-page specific code → Keep in `app/{route}/` with co-location
- Common UI components → Place in `components/` (or `shared/components/` when migrated)
- Technology-specific utilities → Place in `shared/lib/`

### Shared Structure (`src/shared/`)

For technology-specific utilities and common infrastructure code:

```
src/shared/
└── lib/                       # Technology-specific utilities
    └── session/              # Session management (iron-session)
        ├── clientSession.ts  # Client-side session cache
        ├── serverSession.ts  # Server-side session
        ├── session.ts        # Iron-session configuration
        ├── type.ts          # SessionData type
        └── index.ts         # Public exports
```

**Current Shared Modules:**

- `lib/session/` - Session management with iron-session (used by auth, middleware, API routes)

**When to use shared/lib/:**

- Technology-specific utilities (React hooks, browser APIs, specific libraries)
- Infrastructure code used across multiple features
- Not domain-specific but project-specific

### Next.js App Router Structure

The `src/app` directory uses:

- **Route Groups** `(groupName)` - Group related pages without affecting URL structure (e.g., `(auth)`, `(home)`, `(store)`)
- **Underscore Prefix** `_folderName` - Marks folders that should NOT be part of routing (e.g., `_api`, `_components`, `_hooks`)

### Domain-Based API Organization Pattern

**For page-specific APIs** (used only within one route), use the co-location pattern:

```
src/app/(domain)/
├── _api/                    # Domain-specific API layer
│   ├── {feature}.api.ts     # Raw API calls using ky
│   ├── {feature}.queries.ts # TanStack Query queryOptions
│   ├── {feature}.mutations.ts # TanStack Query mutations (if needed)
│   └── {feature}.types.ts   # API response/request types
├── _components/             # Domain-shared components
├── _hooks/                  # Domain-shared hooks
├── _types/                  # Domain-specific types
├── _schemas/                # Zod validation schemas
├── _constants/              # Domain-specific constants
└── {page}/                  # Individual pages
    ├── _components/         # Page-specific components
    ├── _hooks/              # Page-specific hooks
    └── page.tsx
```

**Important:** When adding new API integrations:

- **For reusable features:** Create in `src/features/{domain}/api/` with `.api.ts`, `.dto.ts`, `.queries.ts`, and `index.ts`
- **For page-specific APIs:** Use co-location pattern in `app/{route}/_api/` with `.api.ts`, `.queries.ts`, `.types.ts`

### TanStack Query Pattern

Use `queryOptions` factory from TanStack Query for type-safe queries:

```typescript
// Query keys factory
export const featureQueryKeys = {
  all: ["feature"] as const,
  lists: () => [...featureQueryKeys.all, "list"] as const,
  detail: (id: number) => [...featureQueryKeys.all, id] as const,
};

// Query options factory
export const featureQueryOptions = (id: number) =>
  queryOptions({
    queryKey: featureQueryKeys.detail(id),
    queryFn: () => getFeature(id),
  });
```

### HTTP Client Architecture

Three HTTP clients are available in `src/lib/api/client.ts`:

1. **`http`** - Basic ky client with error handling, no auth
2. **`authHttp`** - Extends `http` with:
   - Automatic `Authorization` header injection
   - Token refresh on 401 errors (client-side only)
   - Single retry with fresh token
3. **`nextHttp`** - For calling Next.js API routes (prefixUrl: "/")

**Token Refresh Strategy:**

- **Client-side:** `authHttp` automatically refreshes tokens on 401 and retries once
- **Server-side:** Middleware checks token expiry and refreshes proactively (5 minutes before expiry)
- **Session:** Uses iron-session for server-side encrypted sessions

### Authentication & Routing

**Middleware** (`src/middleware.ts`) handles:

- Public/protected path patterns
- Session validation
- Automatic token refresh (5 min threshold before expiry)
- Redirect to `/login?next={original-path}` for unauthenticated users

**Path Patterns:**

- **Public:** `/`, `/login/**`, `/signup/**`, `/stores`, `/stores/{id}`, `/story/{id}`
- **Protected:** `/stores/register`, `/story/register`, `/member/**`
- Default: All other routes require authentication

### Exception Handling

Custom exception hierarchy in `src/lib/exceptions`:

- `ApiException` (base)
  - `UnauthorizedException` (401)
  - `ForbiddenException` (403)
  - `TimeoutException` (408)
  - `NetworkException` (network errors)

All HTTP errors are automatically converted to these exceptions in `client.ts`.

## Code Conventions

### TypeScript Rules

- Strict mode enabled with `noUncheckedIndexedAccess: true`
- Use `type` over `interface` (enforced by ESLint)
- Type-only imports with inline style: `import { type Foo } from "./foo"`
- Import sorting enforced by `eslint-plugin-simple-import-sort`

### Import Order (Auto-sorted by ESLint)

1. External packages
2. Internal aliases (`@/*`)
3. Relative imports

### ESLint Rules

- Consistent type imports with inline style
- No unused variables
- No empty blocks
- Console: only `console.warn`, `console.error`, `console.info` allowed (no `console.log`)
- Double quotes enforced
- Spaced comments enforced

### File Naming

- **Components:** PascalCase - `Button.tsx`
- **Hooks:** camelCase with `use` prefix - `useLocalStorage.ts`
- **Utils/API:** camelCase - `domainUtils.ts`, `feature.api.ts`
- **Types/Schemas:** camelCase - `feature.types.ts`, `form.schema.ts`
- **Styles:** camelCase with `.css.ts` - `Button.css.ts`

### Folder Naming

- **Route Groups:** `(groupName)`
- **Non-routing folders:** `_folderName`
- **General:** kebab-case or camelCase

### Styling with Vanilla Extract

- Type-safe CSS-in-TS with zero runtime overhead
- Style files co-located with components: `Button.tsx` + `Button.css.ts`
- Theme tokens in `src/styles/`: `colors.css.ts`, `typography.css.ts`, `semantic.css.ts`
- Use `clsx` for conditional classNames

### Form Handling

- `react-hook-form` with `zod` schema validation
- Schemas in `_schemas` folder
- Use `@hookform/resolvers` for Zod integration

### Testing Strategy

- **Unit tests:** Co-locate with source files: `feature.test.ts`
- **E2E tests:** Playwright in `tests/` directory
- **Component tests:** Testing Library + Vitest
- **Mocking:** MSW for API mocking (enable with `MOCKING_ENABLED=true`)

## Important Notes

### Environment Variables

- `.env.local` for local development
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `ORIGIN_VERIFY` - Server-side origin verification header
- `MOCKING_ENABLED` - Enable MSW for development

### Session Management

- **Location:** `src/shared/lib/session/` (technology-specific utility)
- **Server:** `getSessionFromServer()` - Use in Server Components, API routes, middleware
- **Client:** `getSessionFromClient()` - Use in Client Components
- **Import:** `import { ... } from "@/shared/lib/session"`
- Never mix server and client session calls

### Working with Routes

- Always check middleware path patterns when adding new protected routes
- Update `PUBLIC_PATTERNS` or `PROTECTED_PATTERNS` arrays in `middleware.ts`

### PWA Support

- Service worker registration in `src/lib/pwa`
- Manifest at `/manifest.webmanifest`
- Middleware excludes: `mockServiceWorker.js`, `pwaServiceWorker.js`

### Image Hosting

- AWS S3 with CloudFront CDN
- Separate dev and prod buckets

### Analytics

- Google Analytics via `@next/third-parties`
- Microsoft Clarity integration
- OpenGraph metadata for SEO

### Module Aliases

- `@/*` maps to `./src/*`
- Use absolute imports for cleaner code

### Git Workflow

- Conventional commits enforced via Commitizen + commitlint
- Lefthook for git hooks
- lint-staged runs on pre-commit
- Main branch: `main`
