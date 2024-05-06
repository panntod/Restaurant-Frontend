import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { API_URL, fetch_api } from "../utils/auth";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  function syncData() {
    fetch_api("/food/" + search)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }
  useEffect(() => {
    syncData();
  }, [search]);

  async function deleteMenu(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    const req = await fetch_api("/food/" + id, { method: "DELETE" }).then(
      (res) => res.json()
    );

    if (req.status) {
      alert("Sukses delete data");
      syncData();
    } else {
      alert("Gagal menghapus menu");
    }
  }

  return (
    <React.Fragment>
      <Header title="Restoran ABC Menu" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-x-auto">
              <input
                type="text"
                className="mb-4 w-full px-4 py-2 border border-separate border-gray-500 rounded-md"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Menu name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Spicy Level
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item: any, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{item.name}</td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={`${API_URL}/uploaded/${item.image}`}
                            className="w-24"
                            alt="Image"
                          />
                        </td>
                        <td className="px-6 py-4">{item.spicy_level}</td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button className="py-2 px-4 rounded-md bg-green-500 text-white">
                            Edit
                          </button>
                          <button
                            onClick={() => deleteMenu(item.id)}
                            className="py-2 px-4 rounded-md bg-red-500 text-white"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
