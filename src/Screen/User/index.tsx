import { lazy } from "react";
const Login = lazy(()=>import("./Login"));
const SignUp = lazy(()=>import("./SignUp"));
const ResetPassword = lazy(()=>import("./ResetPassword"));
const ForgetPassword = lazy(()=>import("./ForgetPassword"));
const Timer = lazy(()=>import("./Timer"));
export { ForgetPassword, Login, ResetPassword, SignUp, Timer };
