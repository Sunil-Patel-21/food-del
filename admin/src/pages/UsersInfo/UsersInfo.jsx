import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import "./UsersInfo.css";
import Loader from "../../components/Loader/Loader";

function UsersInfo({ url }) {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true); // ✅ loader state

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true); // start loader
      const res = await axios.get(`${url}/api/user/getAllUsers`);
      if (res.data.success) {
        setUsers(res.data.users);
        setTotalUsers(res.data.totalUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false); // stop loader
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`${url}/api/user/deleteUser/${id}`);
      if (res.data.success) {
        alert("User deleted successfully");
        fetchUsers(); // refresh after deletion
      } else {
        alert(res.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting the user");
    }
  };

  return (
    <div className="users-container">
      <h2 className="title">Users Info</h2>
      <p className="total-users">
        Total Users: <b>{totalUsers}</b>
      </p>

      {/* ✅ Show loader when data is loading */}
      {loading ? (
        <div className="flex-center" style={{ marginTop: "30px" }}>
          <Loader size={50} />
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Index ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <MdDelete
                      className="text-red-600 cursor-pointer"
                      size={30}
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersInfo;
