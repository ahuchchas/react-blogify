import { useState } from "react";
import { ProfileContext } from "../context";

export default function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    user: null,
    loading: false,
    error: null,
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
