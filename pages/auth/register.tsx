import React from "react";
import Image from "next/image";
import dots from "../../src/assets/dots.svg";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const formikSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required!"),
    password: Yup.string()
      .min(6, "minimum 6 character Needed")
      .max(16, "minimum 12 character Needed")
      .required("Password is required"),
    confirmPassword: Yup.string().when("password", {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Password must match"),
    }),
  });
  // @ts-ignore
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formikSchema,
    onSubmit: async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
          name: values.name,
          email: values.email,
          password: values.password,
          profile: "dfg",
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Registered successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
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
    },
  });

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
          Register
        </h3>
        <form
          className={"flex flex-col justify-center max-w-sm mx-auto pt-12"}
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            className="mt-1"
            fullWidth
            onChange={handleChange}
            required={true}
          />
          <p className={"py-4 text-red-700"}>{errors.name}</p>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            className="mt-1"
            type={"email"}
            fullWidth
            onChange={handleChange}
            required={true}
          />
          <p className={"py-4 text-red-700"}>{errors.email}</p>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            className="mt-1"
            type={"password"}
            fullWidth
            onChange={handleChange}
            required={true}
          />
          <p className={"py-4 text-red-700"}>{errors.password}</p>

          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            className="mt-1"
            type={"password"}
            fullWidth
            onChange={handleChange}
            required={true}
          />
          <p className={"py-4 text-red-700"}>{errors.confirmPassword}</p>

          <button
            type={"submit"}
            className={
              "bg-[#6C63FF] py-4 text-white font-semibold rounded-full text-xl"
            }
          >
            Register
          </button>
        </form>
        <div
          className={
            "flex justify-center mx-auto text-[#7A7A7A] font-semibold mt-4"
          }
        >
          Already have an account?&nbsp;
          <span
            className={"text-[#6C63FF] cursor-pointer"}
            onClick={() => router.push("/auth/login")}
          >
            Login here
          </span>{" "}
        </div>
      </div>
    </>
  );
};

export default Register;
