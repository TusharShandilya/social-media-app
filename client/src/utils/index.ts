import { getCookie, setCookie } from "./cookies";
import { getDate } from "./date";

const handleCopyTextToClipboard = (copyText: string) => {
  let aux = document.createElement("input");

  aux.setAttribute("value", copyText);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};

export { getDate, getCookie, setCookie, handleCopyTextToClipboard };
