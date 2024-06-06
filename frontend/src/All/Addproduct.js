import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Addproduct.css'; // Import CSS file
import config from '../config';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: [{ size: '', quantity: '' }],
        images: [] // Add images to the product state
    });
    const [message, setMessage] = useState('');

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedQuantity = [...product.quantity];
        updatedQuantity[index][name] = value;
        setProduct({ ...product, quantity: updatedQuantity });
    };

    const handleAddQuantity = () => {
        setProduct({ ...product, quantity: [...product.quantity, { size: '', quantity: '' }] });
    };

    const handleRemoveQuantity = (index) => {
        const updatedQuantity = [...product.quantity];
        updatedQuantity.splice(index, 1);
        setProduct({ ...product, quantity: updatedQuantity });
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        const base64Images = await Promise.all([...files].map(file => convertToBase64(file)));
        setProduct({ ...product, images: base64Images });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${config.apiUrl}/createproduct`, product,{
                headers: {
                    'x-api-key': 'your-api-key-2' // Replace 'your-api-key' with your actual API key
                }
            });
            setMessage(response.data.message);
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                quantity: [{ size: '', quantity: '' }],
                images: [] // Reset images
            });
        } catch (error) {
            setMessage("Failed to Add Product");
        }
    };

    return (
        <div className="add-product-container">
            <div className="add-product-form">
                <label>Name:</label>
                <input type="text" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
                <label>Description:</label>
                <input type="text" name="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
                <label>Price:</label>
                <input type="number" name="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                <label>Category:</label>
                <input type="text" name="category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} required />
                {product.quantity.map((q, index) => (
                    <div key={index}>
                        <label>Size:</label>
                        <input type="text" value={q.size} onChange={(e) => handleChange(e, index)} name="size" required />
                        <label>Quantity:</label>
                        <input type="text" value={q.quantity} onChange={(e) => handleChange(e, index)} name="quantity" required />
                        {index > 0 && <button type="button" onClick={() => handleRemoveQuantity(index)}>Remove</button>}
                    </div>
                ))}
                <button type="button" onClick={handleAddQuantity}>Add Quantity</button>
                <label>Upload Images:</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                <button type="button" onClick={handleSubmit}>Add Product</button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default AddProduct;
