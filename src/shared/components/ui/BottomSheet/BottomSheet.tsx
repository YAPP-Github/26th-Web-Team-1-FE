"use client";

import { BottomSheetBody } from "./BottomSheetBody";
import { BottomSheetContent } from "./BottomSheetContent";
import { BottomSheetFooter } from "./BottomSheetFooter";
import { BottomSheetRoot } from "./BottomSheetRoot";
import { BottomSheetTitle } from "./BottomSheetTitle";
import { BottomSheetTrigger } from "./BottomSheetTrigger";

type BottomSheetComposition = {
  /**
   * 바텀시트의 상태 및 컨텍스트를 관리하는 최상위 컴포넌트 (`vaul`의 Drawer.Root 래핑)
   */
  Root: typeof BottomSheetRoot;

  /**
   * 바텀시트를 열기 위한 트리거 (버튼 등)
   * `asChild`로 감싸면 외부 요소를 그대로 트리거로 사용할 수 있음
   */
  Trigger: typeof BottomSheetTrigger;

  /**
   * 바텀시트의 콘텐츠를 감싸는 영역. Portal을 통해 렌더링되며 Overlay와 Content를 포함
   */
  Content: typeof BottomSheetContent;

  /**
   * 바텀시트의 제목 영역. 상단 핸들바와 함께 사용
   */
  Title: typeof BottomSheetTitle;

  /**
   * 바텀시트의 메인 콘텐츠 영역
   */
  Body: typeof BottomSheetBody;

  /**
   * 바텀시트의 하단 영역. 주로 버튼/액션을 배치하는 데 사용
   */
  Footer: typeof BottomSheetFooter;
};

/**
 * BottomSheet 컴포넌트
 * @description Compound Component Pattern을 사용하여 화면 하단에서 나타나는 패널을 구현한 컴포넌트입니다.
 *
 * @see vaul 라이브러리를 기반으로 구현되었습니다. {@link https://vaul.emilkowal.ski/}
 *
 * @example
 * ```tsx
 * <BottomSheet.Root>
 *   <BottomSheet.Trigger asChild>
 *     <Button>바텀시트 열기</Button>
 *   </BottomSheet.Trigger>
 *
 *   <BottomSheet.Content>
 *     <BottomSheet.Title>
 *       제목
 *     </BottomSheet.Title>
 *
 *     <BottomSheet.Body>
 *       <p>여기에 컨텐츠가 들어갑니다.</p>
 *     </BottomSheet.Body>
 *
 *     <BottomSheet.Footer>
 *       <Button size="fullWidth">확인</Button>
 *     </BottomSheet.Footer>
 *   </BottomSheet.Content>
 * </BottomSheet.Root>
 * ```
 */
export const BottomSheet: BottomSheetComposition = {
  Root: BottomSheetRoot,
  Title: BottomSheetTitle,
  Trigger: BottomSheetTrigger,
  Content: BottomSheetContent,
  Body: BottomSheetBody,
  Footer: BottomSheetFooter,
};
