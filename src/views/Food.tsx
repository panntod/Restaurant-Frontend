import React from "react";
import Header from "../components/Header";
import { api_url, fetch_api } from "../utils/auth";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const [modalData, setModalData] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  function syncData() {
    fetch_api("/food/" + search)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data.reverse());
        else toast.error("Menu not found");
      });
  }

  React.useEffect(() => {
    if (search === "") {
      initData();
    } else {
      syncData();
    }
  }, [search]);

  function initData() {
    fetch_api("/food/get/")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data.reverse());
        else toast.error("Failed fetching data");
      })
  }

  React.useEffect(() => {
    initData()
  }, []);

  async function deleteMenu(id: number) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const req = await fetch_api("/food/" + id, { method: "DELETE" }).then(
        (res) => res.json()
      );

      if (req.success) {
        toast.success("Sukses delete data");
        initData();
      } else {
        toast.error("Gagal menghapus menu");
      }
    };
  }

  return (
    <React.Fragment>
      <Header title="Sentolove Menu" />
      <main>
        {showModal && <Modal setIsOpenModal={setShowModal} data={modalData} />}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-x-auto">
              <input
                type="text"
                className="mb-4 w-full px-4 py-2 border border-separate border-gray-500 rounded-md"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => {
                  setModalData(null);
                  setShowModal(true);
                }}
                className="py-2 px-4 mb-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white"
              >
                Tambah
              </button>
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
                  {data
                    .filter((item: any) =>
                      item.price.toString().includes(search)
                    )
                    .map((item: any, index) => {
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
                              src={`${api_url}/images/${item.image}`}
                              className="w-24"
                              alt="Image"
                            />
                          </td>
                          <td className="px-6 py-4">{item.spicy_level}</td>
                          <td className="px-6 py-4">{item.price}</td>
                          <td className="px-6 py-4 flex h-full gap-2">
                            <button
                              onClick={() => {
                                setModalData(item);
                                setShowModal(true);
                              }}
                              className="py-2 px-6 rounded-full bg-green-600 hover:bg-green-500 text-white"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteMenu(item.id)}
                              className="py-2 px-6 rounded-full bg-red-600 hover:bg-red-500 text-white"
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
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
