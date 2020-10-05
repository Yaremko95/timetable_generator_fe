import React, { Component, useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { fetchUsers, setUser } from "../store/users/actions";
import { setUser, fetchUsers } from "../store/users/actions";
import authAxios from "./authAxios";
import axios from "axios";
const withAuth = (Component) => (props) => {
  const { authorizedUser, setUser, fetchUsers } = props;
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    const authorize = async () => {
      const res = await authAxios.get(`/profile/me`, {
        withCredentials: true,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      let user = {};
      if (!res) {
        const secondRes = await axios.get(`/profile/me`, {
          withCredentials: true,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        if (secondRes.status !== 200) {
        } else {
          // sessionStorage.setItem("accessToken", secondRes.data.accessToken);
          setUser(secondRes.data);
        }
      } else {
        if (res.status !== 200) {
        } else {
          // sessionStorage.setItem("accessToken", res.data.accessToken);

          setUser(res.data);
        }
      }
    };

    authorize();

    isLoading(false);
  }, []);
  return <Component {...props} />;
};

const composedAuthHOC = compose(
  connect(
    (state) => {
      return {
        authorizedUser: state.usersReducer.authorizedUser,
      };
    },
    (dispatch) => ({
      setUser: (data) => dispatch(setUser(data)),
      fetchUsers: (data) => dispatch(fetchUsers(data)),
    })
  ),
  withRouter,
  withAuth
);
export default composedAuthHOC;
