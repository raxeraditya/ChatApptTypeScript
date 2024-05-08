import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/users/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const Dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/v1/login",
        user
      );
      if (!res) {
        console.log("res error");
      }
      console.log(res.data.tokendata);
      if (res.status === 200) {
        toast.success(res.data.message);
        Dispatch(setAuthUser(res.data.tokendata));
        return navigate("/");
      }
    } catch (error: any) {
      console.log("catch error", error);
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="main flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-500 h-screen">
        <div className="hey py-8 px-6 max-w-md bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="first flex items-start flex-col justify-center">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                placeholder="username..."
                className="px-5 py-1  active:border-zinc-500 active:border-spacing-0 border bg-transparent rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 block w-full appearance-none leading-normal"
                value={user.username}
                required
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
              />
            </div>

            <div className="first flex items-start flex-col justify-center">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="px-5 py-1  active:border-zinc-500 active:border-spacing-0 border bg-transparent rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 block w-full appearance-none leading-normal"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
