import { useState } from "react";

interface ToastState {
  active: boolean;
  message: string;
  type: "info" | "warning" | "danger" | undefined;
}

export const useToast = (seconds?: number) => {
  const [toastState, setToastState] = useState<ToastState>({
    active: false,
    message: "",
    type: undefined,
  });

  let displayTime = 1500;
  if (seconds) {
    displayTime = seconds * 1000;
  }

  const displayToast = (
    message: string,
    type?: "info" | "warning" | "danger" | undefined
  ) => {
    setToastState({
      active: true,
      message,
      type,
    });

    setTimeout(() => {
      setToastState({
        active: false,
        message: "",
        type: undefined,
      });
    }, displayTime);
  };

  return { toastState, displayToast };
};
