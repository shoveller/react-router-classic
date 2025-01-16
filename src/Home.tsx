import { selector, useRecoilValue } from "recoil";
import { resource } from "./api";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const resourceAtom = selector({
  key: "resourceAtom",
  get: async () => {
    return await resource();
  },
});

const Home = () => {
  const navigate = useNavigate();
  //   const resource = useRecoilValue(resourceAtom);
  const { data } = useQuery({
    queryKey: ["resource"],
    queryFn: () => resource(),
  });

  const onClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <h1>아무나 보면 안되는 페이지</h1>
      <span>{JSON.stringify(data)}</span>
      <button onClick={onClick}>로그아웃</button>
    </>
  );
};

export default Home;
