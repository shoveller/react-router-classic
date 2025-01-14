import { atomFamily, useRecoilValue } from "recoil"
import { resource } from "./api"
import { useNavigate } from "react-router"

const resourceAtomFamily = atomFamily({
    key: 'homeAtom',
    default: async(accessToken: string) => {
        return await resource(accessToken)
    }
})

const LogoutButton = () => {
    const navigate = useNavigate()
    const onClick = () => {
        localStorage.clear()
        navigate('/login')
    }

    return <button type="button" onClick={onClick}>로그아웃</button>
}

const Home = () => {
  const accessToken = localStorage.getItem('accessToken')  
  const value = useRecoilValue(resourceAtomFamily(accessToken!))

  return (
    <>
        <h1>아무나 들어오면 안 되는 페이지</h1>
        <span>{JSON.stringify(value)}</span>
        <LogoutButton />
    </>
  )
}

export default Home