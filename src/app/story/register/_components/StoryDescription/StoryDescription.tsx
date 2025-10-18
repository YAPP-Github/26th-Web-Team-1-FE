"use client";

import { useFormContext } from "react-hook-form";

import { TextField } from "@/shared/components/ui/TextField";

import { type StoryRegisterFormData } from "../../_schemas";
import * as styles from "./StoryDescription.css";

export const StoryDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoryRegisterFormData>();

  return (
    <div className={styles.wrapper}>
      <TextField
        {...register("description")}
        as='textarea'
        placeholder='가게에 대해 설명해주세요'
        status={errors.description ? "negative" : "inactive"}
        helperText={errors.description?.message}
        className={styles.textField}
      />
    </div>
  );
};
