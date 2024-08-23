import { useEffect, useState } from 'react';
import "./Dashboard.css";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function Example() {
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [variant, setVariant] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        axios.get('http://localhost:5002/notes')
            .then((res) => {
                setProducts(res.data.data);
            })

    };

    const handleClose = () => {
        clearForm();
        setShow(false);
    };

    const handleShow = () => {
        clearForm();
        setShow(true);
    };

    const handleCustomer = (e) => {
        e.preventDefault();

        if (id) {
            // Update product
            axios.put('http://localhost:5002/notes', { title, description, variant, price })
                .then((response) => {
                    getProduct("");
                    setId("");
                    setTitle("");
                    setVariant("")
                    setDescription("");
                    setPrice("")
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } else {
            // Add new product
            axios.post("http://localhost:5002/notes", { title, description, variant, price })
                .then((response) => {
                    getProduct("");
                    setId("");
                    setTitle("");
                    setVariant("");
                    setDescription("");
                    setPrice("")
                    clearForm("");
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error adding product:", error);
                });
        }
    };

    const clearForm = () => {
        setId("");
        setTitle("");
        setVariant("");
        setDescription("");
        setPrice("");
    };

    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`http://localhost:5002/notes/${noteId}`);
            getProduct();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const userform = (noteData) => {
        setId(noteData._id);
        setTitle(noteData.title);
        setDescription(noteData.description);
        setVariant(noteData.variant);
        setPrice(noteData.price);
        handleShow();
    };

    return (
        <>
            <Button variant="primary" className='btn-1' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{id ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCustomer}>
                        <FloatingLabel controlId="floatingTitle" label="Product Name" className="mb-3">
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingVariant" label="Variant" className="mb-3">
                            <Form.Control type="text" value={variant} onChange={(e) => setVariant(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPrice" label="Price" className="mb-3">
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </FloatingLabel>

                        <Button variant="primary" type='submit' className='ms-3'>
                            {id ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Variant</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(data => (
                        <tr key={data._id}>
                            <td>{data._id}</td>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>{data.variant}</td>
                            <td>{data.price}</td>
                            <td>
                                <Button variant="primary" onClick={() => userform(data)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(data._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Example;
