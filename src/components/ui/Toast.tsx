"use client";

import { toast as sonnerToast } from "sonner";

// Re-export sonner toast with WVC styling helpers
export { toast } from "sonner";

export function toastSuccess(message: string) {
  sonnerToast.success(message, {
    style: {
      background: "#0B1F3A",
      color: "#FAF7F0",
      border: "1px solid #C9A84C",
    },
  });
}

export function toastError(message: string) {
  sonnerToast.error(message, {
    style: {
      background: "#0B1F3A",
      color: "#FAF7F0",
      border: "1px solid #dc2626",
    },
  });
}
