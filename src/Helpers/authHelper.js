import { instance } from "../Instance_axios/instance";

const signInHelper = async (user) => {
  try {
    const { data, status } = await instance.post("/sign-in", { ...user });
    if (status !== 200) throw new Error("Error was throw..!");
    return data;
  } catch (error) {
    console.log(error?.message);
    return Promise.reject(error);
  }
};
const signUpHelper = async (user) => {
  try {
    const { data, status } = await instance.post("/sign-up", { ...user });
    if (status !== 201) throw new Error("Error was throw..!");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const sendUserOtpHelper = async (email) => {
  try {
    const { data, status } = await instance.post("/reset-password/send-otp", {
      email,
    });
    if (status !== 200) throw new Error("Error was throw..!");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const verifyUserOtpHelper = async (payload) => {
  try {
    const { data, status } = await instance.post("/reset-password/verify-otp", {
      otp: payload?.otp,
      email: payload?.email,
    });
    if (status !== 200) throw new Error("Error was throw..!");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const resetUserPassWordHelper = async (password, otpToken) => {
  try {
    const { data, status } = await instance.post(
      "/reset-password",
      {
        newPassword: password,
      },
      { headers: { Authorization: `Bearer ${otpToken}` } }
    );
    if (status !== 200) throw new Error("Error was throw..!");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const logOutHelper = async (accessToken) => {
  try {
    const { data, status } = await instance.get("/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (status !== 200) throw new Error("Error was throw..!");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const getProfileInfo = async (id, accessToken) => {
  const result = await instance.get(`/user-info/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};
const chooseDefaultLocation = async ({ userId, addressId, accessToken }) => {
  const result = await instance.patch(
    `choose-default-address/${userId}/${addressId}`,
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return result.data;
};
const addAddress = async ({ userId, accessToken, payload }) => {
  const result = await instance.post(
    `add-address/${userId}`,
    { ...payload },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return result.data;
};
const updateProfile = async ({ userId, accessToken, payload }) => {
  // console.log(userId, accessToken, payload)
  const result = await instance.patch(
    `update-profile/${userId}`,
    { ...payload },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return result.data;
};

export {
  addAddress,
  chooseDefaultLocation,
  getProfileInfo,
  logOutHelper, resetUserPassWordHelper, sendUserOtpHelper, signInHelper,
  signUpHelper,
  updateProfile, verifyUserOtpHelper
};

