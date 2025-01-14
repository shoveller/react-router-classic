import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from "./Login.tsx";
import { RecoilRoot } from 'recoil';
import Home from './Home.tsx';

const SecureRoute = () => {
  // 통행증이 있으면 통과, 없으면 로그인 페이지로 이동
}

const RotuerProvider = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RotuerProvider />
    </RecoilRoot>
  </StrictMode>,
)
