import { useEffect, useState } from 'react';
import "./Dashboard.css";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ContactForm() {
    const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        axios.get('http://localhost:5002/users')
            .then((res) => {
                setContacts(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching contacts:", error);
            });
    };

    const handleClose = () => {
        clearForm();
        setShow(false);
    };

    const handleShow = () => {
        clearForm();
        setShow(true);
    };

    const handleContact = (e) => {
        e.preventDefault();

        if (id) {
            axios.put(`http://localhost:5002/users/${id}`, { name, email, phone, message })
                .then((response) => {
                    getContacts();
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error updating contact:", error);
                });
        } else {
            axios.post("http://localhost:5002/users", { name, email, phone, message })
                .then((response) => {
                    getContacts();
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error adding contact:", error);
                });
        }
    };

    const clearForm = () => {
        setId("");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
    };

    const handleDelete = async (contactId) => {
        try {
            await axios.delete(`http://localhost:5002/users/${contactId}`);
            getContacts();
        } catch (error) {
            console.error("There was an error deleting the contact!", error);
        }
    };

    const userForm = (userContact) => {
        setId(userContact._id);
        setName(userContact.name);
        setEmail(userContact.email);
        setPhone(userContact.phone);
        setMessage(userContact.message);
        setShow(true);

        // handleShow();
    };

    return (
        <>
            <Button variant="success" className='btn-1' onClick={handleShow}>
                Add Contact
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{id ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleContact}>
                        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
                            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingMessage" label="Message" className="mb-3">
                            <Form.Control type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </FloatingLabel>

                        <Button variant="outline-primary" type='submit' className='ms-3'>
                            {id ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact._id}>
                            <td>{contact._id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.message}</td>
                            <td>
                                <Button variant="info" onClick={() => userForm(contact)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(contact._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ContactForm;
