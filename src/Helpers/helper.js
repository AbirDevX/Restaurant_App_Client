import { instance } from "../Instance_axios/instance";

export const menuPagination = async (limit, skip, accessToken, category) => {
  const result = await instance.get(
    `/menu-pagination?skip=${skip}&limit=${limit}&category=${category}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return result.data;
};
export const foodPagination = async (limit, skip, accessToken, category) => {
  const result = await instance.get(
    `/food-pagination?skip=${skip}&limit=${limit}&category=${category}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return result.data;
};
export const placeOrder = async ({ payload, accessToken }) => {
  const result = await instance.post(
    `/place-order`,
    { ...payload },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return result.data;
};

export const ordersListPagination = async (
  limit,
  skip,
  accessToken,
  orderStatus
) => {
  const result = await instance.get(
    `/orders-pagination?skip=${skip}&limit=${limit}&orderStatus=${orderStatus}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return result.data;
};

export const orderDetails = async ({ orderId, accessToken }) => {
  const result = await instance.get(`/order-details/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};

export const getTables = async ({ accessToken }) => {
  const result = await instance.get(`/get-tables`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};

export const bookingATable = async (payload, accessToken) => {
  try {
    const { data, status } = await instance.post(
      "/booking-table",
      {
        ...payload,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (status !== 201) throw new Error("Error was throw..!");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const contactUsMsg = async (payload, accessToken) => {
  try {
    const { data, status } = await instance.post(
      "/contact-us",
      {
        ...payload,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (status !== 201) throw new Error("Error was throw..!");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getServices = async ({ accessToken }) => {
  const result = await instance.get(`/get-services`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};
export const getTeams = async ({ accessToken }) => {
  const result = await instance.get(`/get-teams`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};
export const checkUserCanAddTestimonials = async ({ userId, accessToken }) => {
  const result = await instance.get(`/ready-to-add-testimonials/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};

export const getAllTestimonials = async ({ accessToken }) => {
  const result = await instance.get(`/testimonials`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return result.data;
};

export const addTestimonials = async ({ userId, payload, accessToken }) => {
  try {
    const { data, status } = await instance.post(
      `/add-testimonials/${userId}`,
      {
        ...payload,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (status !== 201) throw new Error("Error was throw..!");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
