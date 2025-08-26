import { useEffect, useState } from "react";
import axios from "axios";
import "./UsersInfo.css";

function UsersInfo({url}) {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${url}/api/user/getAllUsers`); 
        // const res = await axios.get("http://localhost:4000/api/user/getAllUsers"); 
        if (res.data.success) {
          setUsers(res.data.users);
          setTotalUsers(res.data.totalUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={user._id}>
              <td>{index}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
             


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersInfo;
