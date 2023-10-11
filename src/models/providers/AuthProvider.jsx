import { createContext, useReducer } from "react";

const initialState = {
  token: "",
};

const AuthContext = createContext();

const AuthProvider = (props) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "SAVE_USERDATA":
        const obj = JSON.parse(action.payload);
        localStorage.setItem("token", obj.token);
        localStorage.setItem("userId", obj.userId);
        return {
          ...state,
          token: obj.token,
          userId: obj.userId,
        };
      case "GET_USERDATA":
        return { ...state, userId: localStorage.getItem("userId") };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
