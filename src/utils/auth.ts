export const api_url = "http://localhost:8000";

export const login = async (email: string, password: string) => {
  const response = await fetch(api_url + "/admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

  if (response.status) localStorage.setItem("token", response.token);

  return response;
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
  return fetch(api_url + url, {
    headers: {
      authorization: "Bearer " + token,
      ...init?.headers,
    },
    ...init,
  });
};
