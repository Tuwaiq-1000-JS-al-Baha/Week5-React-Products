import { Form, Col, Row, Button, Card } from "react-bootstrap"

function ProductEdit(props) {
  const { confirmEdit, product } = props

  return (
    <Col>
      <Card>
        <Form className="m-2" onSubmit={confirmEdit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4">
              Title
            </Form.Label>
            <Col md="8">
              <Form.Control name="title" defaultValue={product.title} type="text" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4">
              Description
            </Form.Label>
            <Col md="8">
              <Form.Control as="textarea" name="description" rows={3} defaultValue={product.description} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4">
              Quantity
            </Form.Label>
            <Col md="8">
              <Form.Control type="number" name="quantity" defaultValue={product.quantity} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4">
              Category
            </Form.Label>
            <Col md="8">
              <Form.Select aria-label="Default select example" name="category" defaultValue={product.category}>
                <option>food</option>
                <option>clothes</option>
                <option>tools</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4">
              Price
            </Form.Label>
            <Col md="8">
              <Form.Control type="number" name="price" defaultValue={product.price} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="4">
              Image
            </Form.Label>
            <Col md="8">
              <Form.Control type="url" name="image" defaultValue={product.image} required />
            </Col>
          </Form.Group>

          <Button variant="success" type="submit">
            Confirm
          </Button>
        </Form>
      </Card>
    </Col>
  )
}

export default ProductEdit
