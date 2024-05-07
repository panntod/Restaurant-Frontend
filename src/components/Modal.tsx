import { Dispatch, FormEvent, SetStateAction } from "react";
import { fetch_api } from "../utils/auth";
import React from "react";
import { H3 } from "./Text";
import { toast } from "sonner";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: any;
}) {
  async function update(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (data) {
      const result = await fetch_api("/food/" + data.id, {
        method: "PUT",
        body: new FormData(e.target as HTMLFormElement),
      }).then((res) => res.json());
      if (result.status) {
        toast.success("Sukses update data");
        setIsOpenModal(false);
        window.location.reload();
      } else toast.error(result.message);
    } else {
      const result = await fetch_api("/food/", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
      }).then((res) => res.json());
      if (result.status) {
        toast.success("Sukses insert data");
        setIsOpenModal(false);
        window.location.reload();
      } else toast.error(result.message);
    }
  }

  return (
    <div className="bg-gray-300/50 fixed w-full z-10 justify-center items-center top-0 right-0 h-full m-auto">
      <div className="relative p-4 w-full h-full max-w-2xl max-h-full m-auto top-20">
        <div className="relative bg-white rounded-lg">
          <form onSubmit={update}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b">
              <H3>Menu</H3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all"
                onClick={() => setIsOpenModal(false)}
                type="button"
              >
                X
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nama Menu
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Nama menu"
                  name="name"
                  defaultValue={data?.name}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="image"
                  type="file"
                  placeholder="Upload gambar"
                  name="image"
                  required={!data}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="spicy_level"
                >
                  Spicy Level
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="spicy_level"
                  type="text"
                  placeholder="Not Spicy"
                  name="spicy_level"
                  required
                  defaultValue={data?.spicy_level}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  placeholder="Price"
                  name="price"
                  defaultValue={data?.price}
                  required
                />
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
              <button
                className="px-3 py-2 rounded-md bg-blue-500 text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
