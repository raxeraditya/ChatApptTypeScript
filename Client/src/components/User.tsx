import { RootState } from "../redux/store";
import Users from "./Users";
import { useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";

const User = () => {
  const { authUser }: any = useSelector((state: RootState) => {
    return state.authUser;
  });
  console.log(authUser);
  return (
    <div className="w-80">
      <div className="top flex-col bg-red-700 sm:flex sm:justify-between items-center py-5 px-3">
        <input
          type="text"
          placeholder="Search"
          className="py-1 border border-zinc-800 rounded-lg"
        />
        <div className="main h-5 w-5">
          <IoSearchSharp className="" />
        </div>
        <div className="">
          User ID: {authUser?.userId}, Username: {authUser?.userName}
        </div>
      </div>
      <div className="users overflow-auto h-96">
        <Users />
        {/* Render other Users components */}
      </div>
    </div>
  );
};

export default User;
