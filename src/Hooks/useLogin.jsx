import JsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { instance } from "../Instance_axios/instance";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../Redux/Slice/authSclice";

function useAutoLogin() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const accessToken = JsCookie.get("user_accessToken");
  useEffect(() => {
    // console.log(accessToken)
    const fetchUserData = async () => {
      try {
        const { data } = await instance.get(`/verify-token`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(data);
        dispatch(setIsAuthenticate(data?.isAuthenticated));
        dispatch(setAccessToken(data?.accessToken));
        dispatch(setUser(data?.user));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        dispatch(setIsAuthenticate(false));
        dispatch(setAccessToken(null));
        dispatch(setUser(null));
        console.log(err.message);
      }
    };

    // if (accessToken) {
    fetchUserData();
    // } else {
    // setLoading(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
}

export { useAutoLogin };

