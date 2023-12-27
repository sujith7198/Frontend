import React, { useState, useEffect } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import { MdDelete, MdBrowserUpdated } from 'react-icons/md';
import Button from 'react-bootstrap/esm/Button';
import MyVerticallyCenteredModal from './updatedetailes';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './AuthContext';

function Admin() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const auth = useAuth(); 

  const navigate = useNavigate(); 
  const handleLogout = () => {
    auth.clearAuthToken();
   
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/userDetails');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:8080/userDetails/${userId}`, {
        method: 'DELETE',
      });

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/userDetails/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        await fetchUsers();
        setModalShow(false);
        setSelectedUser(null);
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

    return(<> 
    <div className='d-flex justify-content-end my-2'> <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button></div>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th className="center-icon">Name</th>
            <th className="center-icon">Email</th>
            <th className="center-icon">Phone Number</th>
            <th className="center-icon">Password</th>
            <th className="center-icon">Delete</th>
            <th className="center-icon">Update</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="center-icon">{user.name}</td>
              <td className="center-icon">{user.email}</td>
              <td className="center-icon">{user.phoneNumber}</td>
              <td className="center-icon">{user.password}</td>
              <td className="center-icon">
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ backgroundColor: 'red', color: 'white', borderBlockColor: 'red' }}
                >
                  <MdDelete />
                </button>
              </td>
              <td className="center-icon">
                <Button
                  style={{ padding: "6px", backgroundColor: 'blue', color: 'white', borderBlockColor: 'blue' }}
                  variant="primary"
                  onClick={() => handleUpdate(user)}
                >
                  <MdBrowserUpdated />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     
        
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onUpdate={handleUpdateSubmit}
        />
      </>)
}
export default Admin