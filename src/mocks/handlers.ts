import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:8080/api/hello", () => {
    return HttpResponse.json({
      message: "hello from msw",
    });
  }),
];
