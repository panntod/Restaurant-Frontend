export const API_URL = "http://10.213.13.79:3000";

export const login = async (email: string, password: string) => {
  const req = await fetch(API_URL + "/admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

  if (req.status) localStorage.setItem("token", req.token);

  return req;
};

export const getStatus = () => {
  const data = localStorage.getItem("token");

  if (data) {
    return {
      token: data,
      isLoggedIn: true,
    };
  } else {
    return {
      isLoggedIn: false,
    };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
  return true;
};

export const fetch_api = (url: RequestInfo | URL, init?: RequestInit) => {
  const token = localStorage.getItem("token");
  return fetch(API_URL + url, {
    headers: {
      authorization: "Bearer " + token,
      ...init?.headers,
    },
    ...init,
  });
};
