import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import "./Product.css";
// import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';





function BasicExample() {

    // const [show, setShow] = useState(false);

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [price, setPrice] = useState("");
    // const [variant, setVariant] = useState("");
    // const [id, setId] = useState("");



    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    // const handleCustomer = (e) => {
    //     e.preventDefault();

    //     if (id) {
    //         axios.put("http://localhost:5002/notes", { id, title, description, variant, price })
    //             .then((response) => {
    //                 setId("");
    //                 setTitle("");
    //                 setVariant("")
    //                 setDescription("");
    //                 setPrice("")


    //             })


    //     } else {
    //         axios.post("http://localhost:5002/notes", { id, title, description, variant, price })
    //             .then((response) => {
    //                 setId("");
    //                 setTitle("");
    //                 setVariant("");
    //                 setDescription("");
    //                 setPrice("")
    //                 clearForm("");

    //             })

    //     }
    // }
    // const clearForm = () => {
    //     setId("");
    //     setTitle("");
    //     setVariant("");
    //     setDescription("");
    //     setPrice("")
    // }


    return (
        <>

            {/* <Button variant="primary" className='btn-1' onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </Button> */}


            {/* <Modal.Title>Add Product</Modal.Title> */}


            {/* <Form onSubmit={handleCustomer}>
                <FloatingLabel controlId="floatingPassword" label="Product Name" value={title} onChange={(e) => setTitle(e.target.value)}>
                    <Form.Control type="text" className="mb-3" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Variant" value={description} onChange={(e) => setDescription(e.target.value)}>
                    <Form.Control type="text" className="mb-3" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Discription" value={variant} onChange={(e) => setVariant(e.target.value)} >
                    <Form.Control type="text" className="mb-3" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Price" value={price} onChange={(e) => setPrice(e.target.value)}>
                    <Form.Control type="text" className="mb-3" />
                </FloatingLabel>
                <Button variant="secondary">
                    Close
                </Button>
                <Button variant="primary" type='submit' className='ms-3'>
                    {id ? 'Update' : 'Add'}
                </Button>
            </Form> */}





        </>
    );
}

export default BasicExample;