import React from "react";
import Header from "../components/Header";
import { fetch_api } from "../utils/auth";
import Modal from "../components/Modal";
import Card from "../components/Card";

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
        else alert("Failed fetching data");
      });
  }
  
  React.useEffect(() => {
    syncData();
  }, [search]);


  return (
    <React.Fragment>
      <Header title="Food Ordering System" />
      <main>
        {showModal && <Modal setIsOpenModal={setShowModal} data={modalData} />}
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

              {/* Aku buatin card nya  oke*/}
              <div className="flex gap-3 flex-wrap">
                {data.map((data: any, index: number) => (
                  <Card data={data} />
                ))}
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
