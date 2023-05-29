import React from "react";

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  isAdmin: false,
  login: (token, userId, isAdmin) => {},
  logout: () => {},
});
