import {FormEventHandler} from "react";
import {login} from "./api";

const Login = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const username = formData.get('username') as string

      const { accessToken, refreshToken } = await login(username)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
  }

  return (
    <>
      <h1>로그인 페이지</h1>
      <form onSubmit={onSubmit}>
          <input name="username" />
          <button type="submit">로그인</button>
      </form>
    </>
  )
}

export default Login
