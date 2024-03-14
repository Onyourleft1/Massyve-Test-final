"use client";

import { useLoginContext } from "@/context/LoginContext";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import Cookie from "js-cookie";
import "./Logout.scss";

function Logout() {
  const { login, setLogin } = useLoginContext();
  const { user, setUser } = useUserContext();
  const logout = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/Users/logout`).then(() => {
      setLogin(false);
      setUser({});
      Cookie.remove("token");
    });
  };
  return (
    <div id="logout_container">
      {login ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Logout;
