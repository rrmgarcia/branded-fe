import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../models/providers/AuthProvider";

function AuthGuard(props) {
  const [state, dispatch] = useContext(AuthContext);
  const cachedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cachedToken) {
      navigate("/login");
    } else if (state.token !== cachedToken) {
      dispatch({ type: "SAVE_TOKEN", payload: cachedToken });
    }
  }, [cachedToken, state.token, dispatch, navigate]);

  return <>{props.children}</>;
}

export default AuthGuard;
