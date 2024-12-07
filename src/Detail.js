import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "./ApiService";
import { Card, Button, Form } from "react-bootstrap";

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductDetails(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        // Navigasi ke Cart tanpa mengubah data
        navigate("/cart");
    };

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <Card style={{ maxWidth: "300px", margin: "0 auto" }}>
            <Card.Img variant="top" src={product.image} alt={product.title} />
            <Card.Body>
                <Card.Title style={{ fontSize: "1.2rem" }}>{product.title}</Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Form.Group>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                </Form.Group>
                <Button variant="primary" className="mt-3" onClick={handleAddToCart}>
                Add to Cart
                </Button>
            </Card.Body>
        </Card>

    );
}

export default Detail;
