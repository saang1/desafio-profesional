// ManageAttributes.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';
import { getAttributes, addAttributes, updateAttributes, deleteAttributes } from '../services/AttributeService';

const ManageAttributes = () => {
  const [Attributes, setAttributes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAttributes, setCurrentAttributes] = useState({ name: '', icon: '' });

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    const data = await getAttributes();
    setAttributes(data);
  };

  const handleAddAttributes = async () => {
    await addAttributes(currentAttributes);
    fetchAttributes();
    setShowModal(false);
  };

  const handleUpdateAttributes = async (id) => {
    await updateAttributes(id, currentAttributes);
    fetchAttributes();
    setShowModal(false);
  };

  const handleDeleteAttributes = async (id) => {
    await deleteAttributes(id);
    fetchAttributes();
  };

  return (
    <Container className="mt-5">
      <h2>Manage Attributes</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Attributes
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Icon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Attributes.map((char) => (
            <tr key={char.id}>
              <td>{char.name}</td>
              <td>
                <img src={char.icon} alt={char.name} width="50" />
              </td>
              <td>
                <Button variant="warning" onClick={() => {
                  setCurrentAttributes(char);
                  setShowModal(true);
                }}>
                  Edit
                </Button>
                {' '}
                <Button variant="danger" onClick={() => handleDeleteAttributes(char.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentAttributes.id ? 'Edit Attributes' : 'Add Attributes'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAttributesName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentAttributes.name}
                onChange={(e) => setCurrentAttributes({ ...currentAttributes, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAttributesIcon" className="mt-3">
              <Form.Label>Icon</Form.Label>
              <Form.Control
                type="text"
                value={currentAttributes.icon}
                onChange={(e) => setCurrentAttributes({ ...currentAttributes, icon: e.target.value })}
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
    </Container>
  );
};

export default ManageAttributes;
