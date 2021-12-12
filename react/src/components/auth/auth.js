import React, { useEffect, useState } from "react";

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
export const AuthContext = React.createContext();

const useProvideAuth = () => {
  const [token, setToken] = useState(null);

  const signin = (token) => {
    return fakeAuth.signin(() => {
      setToken(token);
    });
  };

  const signout = () => {
    return fakeAuth.signout(() => {
      setToken(null);
    });
  };

  return {
    token,
    setToken,
    signin,
    signout,
  };
};

export default function ProviderAuth ({ children }) {
  const auth = useProvideAuth();
  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      auth.setToken(localStorage.getItem('refresh_token'));
    }
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// export { AuthContext, ProviderAuth };
