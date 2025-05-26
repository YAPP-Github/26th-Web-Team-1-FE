import express from "express";
import { createMiddleware } from "@mswjs/http-middleware";
import { handlers } from "./handlers";

const app = express();

app.use(createMiddleware(...handlers));

app.listen(8080, () => {
  console.log("[MSW] Mock API server running on http://localhost:8080");
});
