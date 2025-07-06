import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
} from "../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setError} from "../features/auth/authSlice";
import "./AuthPage.css";
import AuthForm from "../features/auth/components/AuthForm";
import AuthToggle from "../features/auth/components/AuthToggle";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: authError, user } = useSelector((state) => state.auth);
  const { refetch: refetchMe } = useGetMeQuery();

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const isLogin = location.pathname === "/login";

  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user, navigate]);

  const toggleAuthMode = () => {
    navigate(isLogin ? "/signup" : "/login");
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    dispatch(setError(null));

    try {
      let response;
      if (isLogin) {
        response = await login({
          login: formData.email,
          password: formData.password,
        }).unwrap();
        const { data: userData } = await refetchMe();
        dispatch(setCredentials(userData));
      } else {
        response = await register({
          login: formData.email,
          password: formData.password,
          nickname: formData.username,
        }).unwrap();
        console.log(response);
        await login({
          login: formData.email,
          password: formData.password,
        });

        const { data: userData } = await refetchMe();
        dispatch(setCredentials(userData));
      }

      navigate("/homepage");
    } catch (err) {
      console.error("Auth error:", err);

      let errorMessage = "Authentication failed";
      if (err.data) {
        if (typeof err.data === "string") {
          errorMessage = err.data;
        } else if (err.data.error) {
          errorMessage = err.data.error;
        } else if (err.data.message) {
          errorMessage = err.data.message;
        }
      }

      dispatch(setError(errorMessage));
    }
  };

  return (
    <div className="auth">
      <div className="auth-left">
        <button
          className="back-button"
          onClick={() => navigate("/onboarding")}
          aria-label="Go back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className={isLogin ? "login-title" : "signup-title"}>
          {isLogin ? "Sign in" : "Sign up"}
        </h2>
        <AuthForm
          isLogin={isLogin}
          onSubmit={handleSubmit}
          authError={authError}
        />
        <AuthToggle isLogin={isLogin} onToggle={toggleAuthMode} />
      </div>
      <div className="auth-right" />
    </div>
  );
}

export default AuthPage;
