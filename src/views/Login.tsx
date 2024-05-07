import React from "react";
import { getStatus } from "../utils/auth";
import { login } from "../utils/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const status = getStatus();
  if (status.isLoggedIn) window.location.href = "/food";
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    const response = await login(form.email, form.password);

    if (!form.email || !form.password) return toast.error("Value cannot be empty");

    if (response.status) {
      window.location.href = "/food";
    } else toast.error(response.message);
  };

  return (
    <React.Fragment>
      <main>
        <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
          <div className="w-full sm:w-96 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  id="password"
                  type="password"
                  placeholder="*********"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full px-3 py-2 rounded-md bg-blue-500 text-white font-semibold focus:outline-none focus:bg-blue-600"
                type="button"
                onClick={submit}
              >
                Login
              </button>
            </form>
          </div>
        </div>

      </main>
    </React.Fragment>
  );
};

export default Login;
