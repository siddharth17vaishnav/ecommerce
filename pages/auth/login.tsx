import Image from "next/image";
import dots from "../../src/assets/dots.svg";
import React, { useState, useEffect } from "react";
import { FormControlLabel, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { status } = context.query;
  if (status) {
    return {
      props: { status: status },
    };
  } else {
    return {
      props: {},
    };
  }
};
const Login = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (props.status == 401) {
      toast.error("Unauthenticated User!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [props.status]);
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("accessToken", res.data.accessToken);
          Cookies.set("refreshToken", res.data.refreshToken);

          toast.success("Logged in successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          router.push("/dashboard/home");
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
  return (
    <>
      <ToastContainer />
      <div className={" w-full max-h-screen px-5 my-auto"}>
        <div className={"flex-none hidden md:contents"}>
          <Image
            src={dots}
            alt={"dots"}
            style={{ display: "flex", marginInline: "auto", marginTop: "32px" }}
          />
        </div>
        <h3
          className={
            "text-[#6C63FF] text-5xl font-bold flex justify-center mt-12 leading-2"
          }
        >
          Login
        </h3>
        <form
          className={"flex flex-col justify-center max-w-sm mx-auto pt-12"}
          onSubmit={handleOnSubmit}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            className="mb-5"
            type={"email"}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            className="mb-5"
            type={"password"}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          <button
            type={"submit"}
            className={
              "bg-[#6C63FF] py-4 text-white font-semibold rounded-full text-xl"
            }
          >
            Login
          </button>
        </form>
        <div
          className={
            "flex justify-center mx-auto text-[#7A7A7A] font-semibold mt-4"
          }
        >
          {`Don't have an account?&nbsp;`}
          <span
            className={"text-[#6C63FF] cursor-pointer"}
            onClick={() => router.push("/auth/register")}
          >
            Sign up here
          </span>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
