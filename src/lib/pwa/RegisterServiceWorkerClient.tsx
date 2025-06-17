"use client";

import { useEffect } from "react";

import { registerServiceWorker } from "./utils";

export const RegisterServiceWorkerClient = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
};
