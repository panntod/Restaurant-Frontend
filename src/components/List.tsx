import React from "react";

import { H4, P } from "./Text";
import { api_url } from "../utils/auth";
import { toast } from "sonner";

function Order({
  count,
  setCount,
  data,
}: {
  count: any;
  setCount: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  function updateCart(id: number, type: "increase" | "decrease") {
    const storage = localStorage.getItem("cart");
    if (!storage) localStorage.setItem("cart", "[]");

    const cart = storage ? JSON.parse(storage) : [];
    const indexCart = cart.findIndex((item: any) => item.id == id);

    if (indexCart == -1 && type == "increase") {
      cart.push({
        id,
        count: 1,
      });
      setCount(cart);
    } else if (indexCart != -1) {
      if (type == "increase") {
        cart[indexCart].count++;
        setCount(cart);
      } else {
        if (cart[indexCart].count <= 1) {
          if (!confirm("Apakah Anda yakin ingin menghapus?")) return;
          cart.splice(indexCart, 1);
          setCount(cart);
        } else {
          cart[indexCart].count--;
          setCount(cart);
        }
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function deleteItem(index: number) {
    if (confirm("Apakah Anda yakin ingin menghapus?")) {
      const storage = localStorage.getItem("cart");
      if (!storage) localStorage.setItem("cart", "[]");

      const cart = storage ? JSON.parse(storage) : [];

      cart.splice(index, 1);
      setCount(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Success delete item")
    }
  }

  return (
    <section className="w-3/5 mx-12">
      <H4 className="mb-6">Order Details</H4>
      <section className="w-full px-12 py-6 border border-black rounded-md">

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
            {data.length &&
              count
                .filter((x: any) => x.count > 0)
                .map((item: any, index: any) => {
                  const food = data.find((x: any) => x.id == item.id);
                  return (
                    <tr>
                      <td className="flex gap-6 items-center">
                        <img
                          src={api_url + "/images/" + food.image}
                          alt={food.name}
                          className="w-[100px] h-[60px]"
                        />
                        <div className="flex flex-col gap-2">
                          <P className="font-semibold">{food.name}</P>
                          <div className="flex justify-end items-center gap-4">
                            <button
                              onClick={() => updateCart(item.id, "decrease")}
                              className="w-8 h-8 font-bold text-white rounded-full bg-red-500 hover:bg-red-400"
                            >
                              -
                            </button>
                            {item.count}
                            <button
                              onClick={() => updateCart(item.id, "increase")}
                              className="w-8 h-8 font-bold text-white rounded-full bg-green-600 hover:bg-green-500"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      <td>{formatter.format(food.price)}</td>
                      <td>{formatter.format(food.price * item.count)}</td>
                      <td>
                        <button
                          onClick={() => deleteItem(index)}
                          className="py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default Order;
