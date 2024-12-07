import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { fetchProducts } from "./ApiService";
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data); // Set data produk ke state
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        getProducts();
    }, []);

    return (
        <div>
            <h1>List of Items</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Card style={{ marginBottom: "1rem" }}>
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{
                                    objectFit: "cover",
                                    height: "200px",
                                    width: "100%",
                                }}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Link to={`/detail/${product.id}`}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Home;
