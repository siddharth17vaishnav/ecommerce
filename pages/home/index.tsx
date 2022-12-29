import authenticate from "../auth/authenticate";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    authenticate(router).then();
  }, []);
  return <div>home</div>;
};

export default Home;
