import { selector, useRecoilValue } from "recoil";
import { resource } from "./api";
import { useNavigate } from "react-router";

const resourceAtom = selector({
  key: "resourceAtom",
  get: async () => {
    return await resource();
  },
});

const Home = () => {
  const navigate = useNavigate();
  const resource = useRecoilValue(resourceAtom);
  const onClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <h1>아무나 보면 안되는 페이지</h1>
      <span>{JSON.stringify(resource)}</span>
      <button onClick={onClick}>로그아웃</button>
    </>
  );
};

export default Home;
