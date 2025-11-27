import React, { useEffect, useState } from "react";
import "./UpdateFood.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

function UpdateFood({ url }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  // Fetch existing food details
  const fetchFood = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      const food = res.data.data.find((item) => item._id === id);

      if (food) {
        setData({
          name: food.name,
          description: food.description,
          category: food.category,
          price: food.price,
        });
        setOldImage(food.image);
      }
    } catch (error) {
      console.log("Error ", error);
      toast.error("Error fetching food item");
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));

    // image optional
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `${url}/api/food/update/${id}`,
        formData
      );

      if (response.data.success) {
        toast.success("Food updated successfully");
        navigate("/list"); // redirect to list page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error : ", error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="update">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="update-img-upload flex-col">
          <p>Current Image</p>
          <img
            src={`${url}/images/${oldImage}`}
            alt=""
            className="preview-img"
          />

          <p>Upload New Image (optional)</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : "/placeholder.png"}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="update-input-group flex-col">
          <p>Product Name</p>
          <input
            required
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
          />
        </div>

        <div className="update-input-group flex-col">
          <p>Description</p>
          <textarea
            required
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
          ></textarea>
        </div>

        <div className="update-category-price">
          <div className="flex-col">
            <p>Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="flex-col">
            <p>Price</p>
            <input
              required
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
            />
          </div>
        </div>

        <button type="submit" className="update-btn" disabled={loading}>
          {loading ? <Loader size={22} /> : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdateFood;
