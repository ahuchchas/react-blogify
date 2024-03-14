import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const mountElement = document.getElementById("portal-root");

  return createPortal(children, mountElement);
}
