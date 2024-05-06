import React from "react";

import { H2 } from "./Text";

function Order() {
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  async function getCart() {
    const storage = localStorage.getItem("cart");

    const cart = storage ? JSON.parse(storage) : [];
    // const indexCart = cart.findIndex((item: any) => item.id == 0);
    // if (indexCart != -1) {
    //   setCount(cart[indexCart].count);
    // }
  }

  React.useEffect(() => {
    getCart()
  }, [])

  function updateCart(id: number, type: "increase" | "decrease") {
    const storage = localStorage.getItem("cart");
    if (!storage) localStorage.setItem("cart", "[]");

    const cart = storage ? JSON.parse(storage) : [];
    const indexCart = cart.findIndex((item: any) => item.id == id);

    if (indexCart == -1 && type == "increase") {
      cart.push({
        id,
        count: 1
      })
      setCount(count + 1);
    } else if (indexCart != -1) {
      if (type == "increase") {
        cart[indexCart].count++;
        setCount(count + 1);
      } else {
        if (count <= 0) return;
        cart[indexCart].count--;
        setCount(count - 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <section className="p-12 w-full card-body">
      <H2 className="mb-6">Order Details</H2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Product Details</th>
            <th className="text-left">Price</th>
            <th className="text-left">Total</th>
            <th className="text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td className="flex gap-6 align-items-center ">
              <img
                src="https://via.placeholder.com/600x500"
                alt=""
                className="w-[100px] h-[60px]"
              />
              <div className="flex justify-end items-center gap-4">
                <button onClick={() => updateCart(0, "decrease")} className="w-8 h-8 font-semibold rounded-full bg-red-500 hover:bg-red-400">-</button>
                {count}
                <button onClick={() => updateCart(0, "increase")} className="w-8 h-8 font-semibold rounded-full bg-green-600 hover:bg-green-500">+</button>
              </div>
            </td>

            <td>{formatter.format(30000)}</td>
            <td>{formatter.format(30000)}</td>
            <td><button className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Order;
