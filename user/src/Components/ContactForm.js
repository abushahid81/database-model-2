import { useState } from 'react';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const contactData = { name, email, message };

        axios.post("http://localhost:5002/contact", contactData)
            .then(() => {
                setName("");
                setEmail("");
                setMessage("");
                alert('Message sent successfully!');
            })
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingMessage" label="Message" className="mb-3">
                <Form.Control as="textarea" style={{ height: '100px' }} value={message} onChange={(e) => setMessage(e.target.value)} />
            </FloatingLabel>
            <Button variant="primary" type="submit">Send</Button>
        </form>
    );
}

export default ContactForm;
