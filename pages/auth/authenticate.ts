import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Authenticate = async (router: any) => {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    router.push("/auth/login?status=401");
  }
};
export default Authenticate;
