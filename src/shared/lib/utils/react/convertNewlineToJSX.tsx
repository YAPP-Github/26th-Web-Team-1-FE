import { Fragment } from "react";

/**
 * 개행이 포함된 문자열을 JSX로 변환합니다.
 * @description 문자열에서 개행을 <br/> 로 변환하여 JSX로 변환합니다.
 */
export const convertNewlineToJSX = (str: string) => {
  const chunks = str.replace(/\\n/g, "\n").split("\n");

  return chunks.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
};
