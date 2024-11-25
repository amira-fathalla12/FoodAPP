/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../Shared/Components/Header/Header";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmations from "../../../Shared/Components/DeleteConfirmations/DeleteConfirmations";
import NoData from "../../../Shared/Components/NoData/NoData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import useCategories from "../HooksCategories/useCategories";
import imgRes from "../../../../assets/eating a variety of foods-amico.svg";

export default function Categorielist() {
  const [nameValue, setNameValue] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const CategoriesQuery = useCategories();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [categoriesList, setCategoriesList] = useState([]);
  const [modalType, setModalType] = useState(""); // "add", "update", or "delete"
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (type, id = null) => {
    setModalType(type);
    setSelectedCategoryId(id);

    if (type === "update") {
      const selectedCategory = categoriesList.find((cat) => cat.id === id);
      setValue("name", selectedCategory?.name || "");
    }

    setShowModal(true);
  };

  const getCategories = async (pageNo = 1, name = "") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing");

      const response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/`, {
        params: { pageSize: 3, pageNumber: pageNo, name: name },
        headers: { Authorization: token },
      });
      setCategoriesList(response.data.data || []);
      setTotalPages(response.data.totalNumberOfPages || 1);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getCategories(currentPage, nameValue);
  }, [currentPage, nameValue]);

  const addCategory = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing");

      await axios.post(`https://upskilling-egypt.com:3006/api/v1/Category/`, data, {
        headers: { Authorization: token },
      });
      toast.success("Category added successfully");
      getCategories(currentPage, nameValue);
      handleCloseModal();
    } catch (error) {
      toast.error("Error adding category");
    }
  };

  const updateCategory = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing");

      await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedCategoryId}`,
        { name: data.name },
        { headers: { Authorization: token } }
      );
      toast.success("Category updated successfully");
      getCategories(currentPage, nameValue);
      handleCloseModal();
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  const deleteCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authorization token is missing");

      await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedCategoryId}`, {
        headers: { Authorization: token },
      });
      toast.success("Category deleted successfully");
      getCategories(currentPage, nameValue);
    } catch (error) {
      toast.error("Error deleting category");
    }
    handleCloseModal();
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      <Header
        title={"Categories Item"}
        description={"You can now add your items that any user can order from the Application and you can edit."}
        imgHom={imgRes}
      />

      <DeleteConfirmations
        show={showModal && modalType === "delete"}
        handleClose={handleCloseModal}
        deleteItem={"Category"}
        deleteFuncation={deleteCategory}
      />

      <Modal show={showModal && (modalType === "add" || modalType === "update")} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add Category" : "Update Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(modalType === "add" ? addCategory : updateCategory)}>
            <div className="input-group mb-3 p-1">
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Category Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
            <button className="btn btn-primary w-100 mt-3">
              {modalType === "add" ? "Save" : "Update"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-between p-4">
        <h5>Categories Table Details</h5>
        <button className="btn btn-success" onClick={() => handleShowModal("add")}>
          Add new Category
        </button>
      </div>
      <div className="p-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search here ...."
              className="form-control"
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive p-4">
        {categoriesList.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
                <tr key={category.id}>
                  <td className="px-3">{category.name}</td>
                  <td className="px-3">{category.creationDate}</td>
                  <td className="px-3">
                    <i
                      className="fa fa-trash mx-2 text-danger"
                      onClick={() => handleShowModal("delete", category.id)}
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-edit mx-2 text-warning"
                      onClick={() => handleShowModal("update", category.id)}
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`btn btn-secondary mx-1 ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ToastContainer />
    </>
  );
}
