import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({});
  const [newProductFlag, setNewProductFlag] = useState(false);
  const addProductRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const onClickOutside = (event) => {
      if (
        addProductRef.current &&
        !addProductRef.current.contains(event.target)
      ) {
        setNewProductFlag(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="pt-24 bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        <header className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">
            Welcome, Admin! Manage your store here.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section className="bg-gray-50 rounded-xl p-6 shadow flex flex-col">
            <h2 className="text-xl font-semibold mb-4">🛍️ Products</h2>

            {error ? (
              <p className="text-red-500 mb-4">{error}</p>
            ) : products.length === 0 ? (
              <p className="text-gray-500 mb-4">No products available.</p>
            ) : (
              <div className="overflow-y-auto max-h-64 border rounded-lg bg-white p-4 space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border p-3 rounded shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs.
                        {typeof product.price === "number"
                          ? product.price.toFixed(2)
                          : Number(product.price)
                          ? Number(product.price).toFixed(2)
                          : "N/A"}
                      </p>
                    </div>
                    {/* Placeholder for future buttons */}
                    <div>
                      {/* Example Edit/Delete buttons can be added here */}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 self-start"
              onClick={() => setNewProductFlag(true)}
            >
              Add New Product
            </button>
          </section>

          <section className="bg-gray-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">🧾 Orders</h2>
            <div className="border rounded-lg bg-white h-40 flex items-center justify-center text-gray-400">
              Orders table/list goes here
            </div>
            <button className="mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700">
              View All Orders
            </button>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">👥 Users</h2>
            <div className="border rounded-lg bg-white h-40 flex items-center justify-center text-gray-400">
              Users table/list goes here
            </div>
            <button className="mt-4 bg-purple-600 text-white font-semibold px-4 py-2 rounded hover:bg-purple-700">
              Manage Users
            </button>
          </section>

          <section className="bg-gray-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">📊 Analytics</h2>
            <div className="border rounded-lg bg-white h-40 flex items-center justify-center text-gray-400">
              Sales stats/analytics go here
            </div>
          </section>
        </div>
      </div>
      {newProductFlag && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={addProductRef}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

            <label className="block mb-2 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter product name"
            />

            <label className="block mb-2 font-medium text-gray-700">
              Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
            <input type="file" name="image"></input>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setNewProductFlag(false)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  /* Save handler to be implemented */
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
