import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import "./UsersInfo.css";

function UsersInfo({ url }) {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/api/user/getAllUsers`);
      if (res.data.success) {
        setUsers(res.data.users);
        setTotalUsers(res.data.totalUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`http://localhost:4000/api/user/deleteUser/${id}`);
      if (res.data.success) {
        alert("User deleted successfully");
        fetchUsers(); // refresh list after deletion
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
          {users.map((user, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersInfo;
