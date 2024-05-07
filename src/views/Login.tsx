import React, { ChangeEvent } from "react";
import { getStatus } from "../utils/auth";
import { login } from "../utils/auth";

const Login = () => {
  const status = getStatus();
  if (status.isLoggedIn) window.location.href = "/food";
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    const req = await login(form.email, form.password);

    if (!form.email || !form.password) return alert("Value cannot be empty");

    if (req.status) {
      alert("Success");
      window.location.href = "/food";
    } else alert(req.message);
  };

  return (
    <React.Fragment>
      <main>
        <div className="max-w-7xl m-auto py-6 sm:px-6 lg:px-8 min-h-full">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0 max-w-xl m-auto">
            <div className="border-4 border-separate border-gray-200 rounded-lg p-4 text-center text-gray-400">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="*******"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button
                className="px-3 py-2 rounded-md bg-blue-500 text-white"
                type="button"
                onClick={submit}
              >
                Login
              </button>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Login;
