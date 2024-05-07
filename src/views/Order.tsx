import React from "react";
import Header from "../components/Header";
import { fetch_api } from "../utils/auth";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");

  function syncData() {
    fetch_api("/food/find/" + search)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data.reverse());
        else alert("Failed fetching data");
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
    fetch_api("/food/")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data.reverse());
        else alert("Failed fetching data");
      })
  }

  React.useEffect(() => {
    initData()
  }, []);

  return (
    <React.Fragment>
      <Header title="Food Ordering System" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-x-auto">
              <input
                type="text"
                className="mb-4 w-full px-4 py-2 border border-separate border-gray-500 rounded-md"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex gap-3 flex-wrap">
                {data.map((data: any, index: number) => (
                  <Card key={index} data={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
