import { useState } from "react";
import { AvatarContext } from "../context";

export default function AvatarProvider({ children }) {
  const [avatar, setAvatar] = useState(null);
  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}
