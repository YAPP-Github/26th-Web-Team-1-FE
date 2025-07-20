import { globalStyle } from "@vanilla-extract/css";

import { reset } from "./layers.css";

globalStyle("html", {
  fontSize: "62.5%",
});

globalStyle("html, body", {
  height: "100%",
});

globalStyle(
  "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video",
  {
    "@layer": {
      [reset]: {
        margin: 0,
        padding: 0,
        border: 0,
        font: "inherit",
        verticalAlign: "baseline",
      },
    },
  }
);

globalStyle(
  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section",
  {
    "@layer": {
      [reset]: {
        display: "block",
      },
    },
  }
);

globalStyle("body", {
  "@layer": {
    [reset]: {
      lineHeight: 1,
    },
  },
});

globalStyle("ol, ul, li", {
  "@layer": {
    [reset]: {
      listStyle: "none",
    },
  },
});

globalStyle("button", {
  "@layer": {
    [reset]: {
      padding: 0,
      border: "none",
      background: "none",
      outline: "none",
      boxShadow: "none",
      cursor: "pointer",
    },
  },
});

globalStyle("a", {
  "@layer": {
    [reset]: {
      textDecoration: "none",
      color: "inherit",
    },
  },
});

globalStyle("textarea", {
  "@layer": {
    [reset]: {
      padding: 0,
      border: "none",
      height: "auto",
      resize: "none",
    },
  },
});

globalStyle("html", {
  "@layer": {
    [reset]: {
      MozTextSizeAdjust: "none",
      WebkitTextSizeAdjust: "none",
      textSizeAdjust: "none",
    },
  },
});

globalStyle("img", {
  "@layer": {
    [reset]: {
      maxInlineSize: "100%",
      maxBlockSize: "100%",
    },
  },
});

globalStyle("*", {
  "@layer": {
    [reset]: {
      boxSizing: "border-box",
      fontFamily: "var(--font-family)",
      fontWeight: 500,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  },
});

globalStyle("main", {
  "@layer": {
    [reset]: {
      position: "relative",
      width: "100%",
    },
  },
});

globalStyle("input:disabled", {
  "@layer": {
    [reset]: {
      cursor: "not-allowed",
    },
  },
});
