import { FormEventHandler } from "react";
import { login } from "./api";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const { accessToken, refreshToken } = await login(username);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/");
  };

  return (
    <>
      <h1>아무나 볼 수 있는 페이지</h1>
      <form onSubmit={onSubmit}>
        <input name="username" />
        <button type="submit">로그인</button>
        <button type="reset">리셋</button>
      </form>
    </>
  );
};

export default Login;
