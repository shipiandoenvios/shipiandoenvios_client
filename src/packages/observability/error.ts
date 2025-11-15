import { log } from "../lib/log";

let captureExceptionRef: ((e: unknown) => void) | null = null;

if (typeof window === "undefined") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sentry = require("@sentry/nextjs");
    captureExceptionRef = sentry.captureException;
  } catch (e) {
  }
} else {
  import("@sentry/nextjs")
    .then((mod) => {
      captureExceptionRef = mod.captureException;
    })
    .catch(() => {});
}

export const parseError = (error: unknown): string => {
  let message = "An error occurred";

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = (error as any).message as string;
  } else {
    message = String(error);
  }

  try {
    captureExceptionRef?.(error);
    log.error(`Parsing error: ${message}`);
  } catch (newError) {
    console.error("Error parsing error:", newError);
  }

  return message;
};
