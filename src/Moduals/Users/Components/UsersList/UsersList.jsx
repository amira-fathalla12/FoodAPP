/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import { toast } from "react-toastify";
import imgheader from "../../../../assets/eating a variety of foods-amico.svg";
import NoData from "../../../Shared/Components/NoData/NoData";
import Nodata from "../../../../assets/No-Data.png";
import axios from "axios";
import DeleteConfirmations from "../../../Shared/Components/DeleteConfirmations/DeleteConfirmations";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [filters, setFilters] = useState({
    userName: "",
    email: "",
    country: "",
    groups: "",
  });

  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const getUsers = async (pageNo, pageSize) => {
    try {
      const { userName, email, country, groups } = filters;
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/`,
        {
          params: {
            pageSize: pageSize,
            pageNumber: pageNo,
            userName,
            email,
            country,
            groups,
          },
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setArrayOfPages(
        Array(response.data.totalPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsersList(response.data.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("User deleted successfully");
      getUsers(); // Re-fetch users after deletion
    } catch (error) {
      toast.error("Failed to delete User");
    }
    handleClose();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    getUsers(1); // Re-fetch users for page 1 with updated filters
  };

  useEffect(() => {
    getUsers(1,5);

  }, []);

  return (
    <>
      <Header
        title={`Users List`}
        description={
          "This is a welcoming screen for the entry of the application, you can now see the options"
        }
        imgHom={imgheader}
      />
      <DeleteConfirmations
        show={show}
        handleClose={handleClose}
        deleteItem={"User"}
        deleteFuncation={deleteUser}
      />

      <div className="p-4">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="userName"
              placeholder="Search by Name"
              className="form-control"
              value={filters.userName}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="email"
              placeholder="Search by Email"
              className="form-control"
              value={filters.email}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="country"
              placeholder="Search by Country"
              className="form-control"
              value={filters.country}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
  <select
    name="groups"
    className="form-control"
    value={filters.groups}
    onChange={handleFilterChange}
  >
    <option value="">Select Group</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>

        </div>
      </div>

      <div className="table-responsive p-4">
        {usersList.length > 0 ? (
          <>
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id}>
                    <td className="px-3">{user.userName}</td>
                    <td className="px-3">
                      {user.imagePath ? (
                        <img
                          src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                          alt={user.userName}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={Nodata}
                          alt={user.userName}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </td>
                    <td className="px-3">{user.phoneNumber}</td>
                    <td className="px-3">{user.email}</td>
                    <td className="px-3">{user.country}</td>
                    <td className="px-3">
                      <i
                        className="fa fa-trash mx-2 text-danger"
                        onClick={() => handleShow(user.id)}
                        aria-hidden="true"
                      ></i>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                {arrayOfPages.map((pageNo) => (
                  <li
                    className="page-item"
                    key={pageNo}
                    onClick={() => getUsers(pageNo, 3)}
                  >
                    <a className="page-link" href="#">
                      {pageNo}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
