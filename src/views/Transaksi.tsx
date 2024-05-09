import React from "react";
import Header from "../components/Header";
import { fetch_api, getStatus } from "../utils/auth";
import toast from "react-hot-toast";

const Transaksi = () => {
  const [data, setData] = React.useState([]);

  const status = getStatus();
  if (!status.isLoggedIn) window.location.href ="/login";

  React.useEffect(() => {
    fetch_api("/order/")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data?.reverse());
        else toast.error("Failed fetching data");
      });
  }, []);

  return (
    <React.Fragment>
      <Header title="Transaction History" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="relative overflow-hidden border rounded-md shadow">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Table Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Detail order
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item: any, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.order_date}</td>
                        <td className="px-6 py-4">{item.customer_name}</td>
                        <td className="px-6 py-4">{item.table_number}</td>
                        <td className="px-6 py-4">
                          <ul className="list-disc">
                            {item.order_details?.map(
                              (order: any, index: number) => {
                                return (
                                  <li key={index}>
                                    {order.Food?.name} ({order.qty})
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </td>
                        <td className="text-center">
                          {item.order_details?.reduce(
                            (a: any, b: any) => a + b.price,
                            0
                          )}
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

export default Transaksi;
