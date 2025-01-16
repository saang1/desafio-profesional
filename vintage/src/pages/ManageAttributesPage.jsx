// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';
import { getAttributes, addAttributes, updateAttributes, deleteAttributes } from '../services/AttributeService';

const ManageAttributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAttributes, setCurrentAttributes] = useState({ name: '' });
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const data = await getAttributes();
      setAttributes(data);
    } catch (error) {
      console.error('Error fetching attributes:', error);
    }
  };

  const handleAddAttributes = async () => {
    try {
      await addAttributes(currentAttributes, image);
      fetchAttributes();
      setShowModal(false);
      setCurrentAttributes({ name: '' });
      setImage(null);
    } catch (error) {
      console.error('Error adding attribute:', error);
    }
  };

  const handleUpdateAttributes = async (id) => {
    try {
      await updateAttributes(id, currentAttributes, image);
      fetchAttributes();
      setShowModal(false);
      setCurrentAttributes({ name: '' });
      setImage(null);
    } catch (error) {
      console.error('Error updating attribute:', error);
    }
  };

  const handleDeleteAttributes = async () => {
    try {
      await deleteAttributes(deleteId);
      fetchAttributes();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting attribute:', error);
    }
  };

  const openAddModal = () => {
    setCurrentAttributes({ name: '' });
    setImage(null);
    setShowModal(true);
  };

  const openEditModal = (attr) => {
    setCurrentAttributes(attr);
    setImage(null);
    setShowModal(true);
  };

  return (
    <Container className="mt-5">
      <h2>Manage Attributes</h2>
      <Button variant="primary" onClick={openAddModal}>
        Add New Attribute
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.id}>
              <td>{attr.name}</td>
              <td>
                {attr.icon ? (
                  <img
                    src={`data:image/png;base64,${attr.icon}`}
                    alt={attr.name}
                    width="50"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => openEditModal(attr)}>
                  Edit
                </Button>
                {' '}
                <Button variant="danger" onClick={() => {
                  setDeleteId(attr.id);
                  setShowDeleteModal(true);
                }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentAttributes.id ? 'Edit Attribute' : 'Add Attribute'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAttributeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentAttributes.name}
                onChange={(e) => setCurrentAttributes({ ...currentAttributes, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAttributeImage" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={currentAttributes.id ? () => handleUpdateAttributes(currentAttributes.id) : handleAddAttributes}>
            {currentAttributes.id ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this attribute?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAttributes}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAttributes;
