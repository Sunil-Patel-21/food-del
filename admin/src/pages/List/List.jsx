import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader"; // ✅ import loader

function List({ url }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader state

  const fetchList = async () => {
    try {
      setLoading(true); // start loader
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error in listing food");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching data");
    }
    setLoading(false); // stop loader
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error in removing food");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting",error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      {/* ✅ Show loader while data loads */}
      {loading ? (
        <div className="flex-center" style={{ marginTop: "50px" }}>
          <Loader size={55} />
        </div>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No Food Items Found
            </p>
          ) : (
            list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p
                  onClick={() => removeFood(item._id)}
                  className="cursor"
                  style={{ color: "red" }}
                >
                  <MdDeleteForever size={22} id="deleteIcon" />
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default List;
