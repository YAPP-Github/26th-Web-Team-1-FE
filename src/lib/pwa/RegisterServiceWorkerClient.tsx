"use client";

import { useEffect } from "react";

import { registerServiceWorker } from "./_utils";

export const RegisterServiceWorkerClient = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
};
