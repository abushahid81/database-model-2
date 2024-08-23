import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ProductForm from './ProductForm';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios.get('http://localhost:5002/notes')
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((error) => console.error(error));
    };

    const handleSave = (product) => {
        if (product._id) {
            axios.put(`http://localhost:5002/notes/${product._id}`, product)
                .then(getProducts)
                .catch((error) => console.error(error));
        } else {
            axios.post("http://localhost:5002/notes", product)
                .then(getProducts)
                .catch((error) => console.error(error));
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5002/notes/${productId}`);
            getProducts();
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleAdd = () => {
        setSelectedProduct(null);
        setShowForm(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleAdd}>Add Product</Button>
            {showForm && (
                <ProductForm
                    productData={selectedProduct}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}
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
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.variant}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(product)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default ProductList;
