import { useContext } from "react";
import { AvatarContext } from "../context";

export function useAvatar() {
  return useContext(AvatarContext);
}
