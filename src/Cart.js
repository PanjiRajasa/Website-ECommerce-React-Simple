import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProducts, fetchCart } from "./ApiService";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");

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
          quantity: randomQuantities[Math.floor(Math.random() * randomQuantities.length)], // Pilih quantity acak
        }));

        // Ambil tanggal dari API (menggunakan endpoint fetchCart)
        const cartData = await fetchCart(1); // Ganti dengan ID user konstan (misal: 1)
        const fakeTransactionDate = cartData[0]?.date || new Date().toISOString();
        setTransactionDate(fakeTransactionDate);

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

  const handleRemoveProduct = (productId) => {
    // Hapus produk dari state cart berdasarkan productId
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    // Hitung ulang total harga
    const newTotal = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <h5 className="text-start">Order Details</h5>
      <p className="text-start">
        Transaction Date: {new Date(transactionDate).toLocaleDateString()}
      </p>
      {cart.length > 0 ? (
        <Row>
          <Col md={8}>
            <ListGroup>
              {cart.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={3}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "80%" }}
                      />
                    </Col>
                    <Col md={5}>
                      <h5>{item.title}</h5>
                      <p>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <p>
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </Col>
                    <Col md={4} className="text-end">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveProduct(item.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Summary</Card.Title>
                <hr />
                <h5>Grand Total: ${total.toFixed(2)}</h5>
                <div className="d-flex justify-content-center">
                  <Link to="/checkout">
                    <Button variant="success">Proceed to Checkout</Button>
                  </Link>
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

export default Cart;
