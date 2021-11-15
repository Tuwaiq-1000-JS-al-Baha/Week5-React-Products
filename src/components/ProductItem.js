import { Col, Card, Button } from "react-bootstrap"

function ProductItem(props) {
  const { product, editProduct, deleteProduct, inProfile } = props
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Price: {product.price} SAR</Card.Text>
          <Card.Text>Quantity: {product.quantity}</Card.Text>
          {inProfile === true ? (
            <>
              <Button variant="info" id={product._id} onClick={editProduct}>
                Edit
              </Button>
              <Button className="ms-2" variant="danger" id={product._id} onClick={deleteProduct}>
                Delete
              </Button>
            </>
          ) : null}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProductItem
