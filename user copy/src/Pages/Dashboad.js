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
                console.log(res.data.data);

            })

    };

    const handleClose = () => {
        clearForm();
        setShow(false);
    };

    const handleShow = () => {
        // clearForm();
        setShow(true);
    };

    const handleCustomer = (e) => {
        e.preventDefault();

        if (id) {
            // Update product
            axios.put(`http://localhost:5002/notes/${id}`, { title, description, variant, price }) // Include the id in the URL
                .then((response) => {
                    console.log("Product Updated:", response.data.data);
                    getProduct();
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        } else {
            // Add new product
            const newProduct = { title, description, variant, price }
            axios.post(`http://localhost:5002/notes`, newProduct) // Remove the id from the URL when adding a new product
                .then((response) => {
                    console.log("Product Updated:", response.data.data);
                    getProduct();
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

    const noteform = (noteData) => {
        console.log("Editing Product:", noteData);
        setId(noteData._id);
        setTitle(noteData.title);
        setDescription(noteData.description);
        setVariant(noteData.variant);
        setPrice(noteData.price);
        setShow(true);

        // handleShow();
    };


    return (
        <>
            <Button variant="outline-primary" className='btn-1' onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
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
                        <Button variant="success" type='submit' className='ms-3'>
                            {id ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Table>
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
                                <Button variant="outline-info" onClick={() => noteform(data)}>Edit</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(data._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Example;
