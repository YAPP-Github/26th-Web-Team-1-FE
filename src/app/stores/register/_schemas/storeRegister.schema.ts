import { z } from "zod";

import {
  MAX_SUPPORT_TEXT_LENGTH,
  MIN_SUPPORT_TEXT_LENGTH,
} from "../_constants/storeRegister.constants";

export const supportTextSchema = z.object({
  supportText: z
    .string()
    .min(
      MIN_SUPPORT_TEXT_LENGTH,
      `최소 ${MIN_SUPPORT_TEXT_LENGTH}자 이상 작성해주세요`
    )
    .max(
      MAX_SUPPORT_TEXT_LENGTH,
      `최대 ${MAX_SUPPORT_TEXT_LENGTH}자 이내로 작성해주세요`
    ),
});
