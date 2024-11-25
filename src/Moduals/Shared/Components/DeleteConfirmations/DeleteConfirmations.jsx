/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Delete from "../../../../assets/No-Data.png";

export default function DeleteConfirmations({deleteItem,deleteFuncation,show,handleClose}) {


  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title> </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="text-center">
        <img src={Delete} alt="Delete this category" />
        <h2>Delete This {deleteItem}</h2>
        <p className="text-muted">
          are you sure you want to delete this item ? if you are sure just
          click on delete it
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={deleteFuncation}>
        Delete this {deleteItem}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
