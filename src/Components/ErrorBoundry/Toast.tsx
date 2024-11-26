import { toast } from "react-toastify";

interface AlertProps {
  messageText: string;
  messageType?: string;
  autoClose?: number;
  toastId?:string
}

export default function Toast({ messageText, messageType, autoClose=1000, toastId }: AlertProps): void {
  const messageStyle = {
    position: "top-right" as const,
    autoClose: autoClose ? autoClose : 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored" as const,
    toastId
  };

  if (messageText) {
    if (messageType) {
      if (messageType === "E") {
        toast.error(messageText, messageStyle);
      } else if (messageType === "S") {
        toast.success(messageText, messageStyle);
      } else if (messageType === "W") {
        toast.warning(messageText, messageStyle);
      }
    } else {
      toast.info(messageText, messageStyle);
    }
  }
}