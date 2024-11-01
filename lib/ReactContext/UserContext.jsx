"use client";

import { createContext, useState } from "react";

export const userInfoContext = createContext(null);

//================================================================

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctorContext, setDoctorContext] = useState(null);
  return (
    <userInfoContext.Provider
      value={{ user, setUser, doctorContext, setDoctorContext }}
    >
      {children}
    </userInfoContext.Provider>
  );
};

export default UserContextProvider;
