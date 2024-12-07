import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { fetchProducts } from "./ApiService";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getCartData = async () => {
      try {
        setLoading(true);

        // Ambil data produk
        const products = await fetchProducts();

        // Data konstan: 7 produk pertama dengan quantity acak
        const randomQuantities = [4, 5, 7, 10];
        const selectedProducts = products.slice(0, 7).map((product) => ({
          ...product,
          quantity: randomQuantities[Math.floor(Math.random() * randomQuantities.length)],
        }));

        // Set cart dan total
        setCart(selectedProducts);
        const calculatedTotal = selectedProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(calculatedTotal);
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setError("Failed to load cart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getCartData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Checkout Preview</h2>
      {cart.length > 0 ? (
        <Row>
          <Col md={8}>
            {/* Box untuk teks Your Cart */}
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                marginBottom: "20px",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              Your Cart
            </div>
            <ListGroup>
              {cart.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={5}>
                      <h5>{item.title}</h5>
                      <p>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </Col>
                    <Col md={7} className="text-end">
                      <p style={{ fontWeight: "bold" }}>
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Order Summary</Card.Title>
                <hr />
                <h5>Grand Total: ${total.toFixed(2)}</h5>
                <div className="d-flex justify-content-center">
                  <Button variant="secondary" disabled>
                    Preview Only
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>No items in the cart.</p>
      )}
    </Container>
  );
}

export default Checkout;
