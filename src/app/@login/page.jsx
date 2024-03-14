"use client";

import { useContext, useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import Cookie from "js-cookie";
import { useLoginContext } from "@/context/LoginContext";
import { useUserContext } from "@/context/UserContext";
import Products from "../products/page";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setLogin } = useLoginContext();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const tkn = Cookie.get("token");
    if (tkn) {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACK_URL}/Users/getLoginInfo`, {
          token: tkn,
        })
        .then((resp) => {
          setUser(resp.data);
          setLogin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLogin(false);
      setUser({});
    }
  }, [setLogin, setUser]);

  const loginl = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACK_URL}/Users/login`, {
        email: email,
        password: password,
      })
      .then((responce) => {
        Cookie.set("token", responce.data.token);
        setLogin(true);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setLogin(false);
      });
  };
  return (
    <>
      {login ? (
        <Products />
      ) : (
        <div id="login_container">
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginl();
            }}
          >
            <div>
              <label htmlFor="email">Email: </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
