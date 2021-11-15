import { Card, Row, Col } from "react-bootstrap"
import ProductItem from "../components/ProductItem"
import ProductEdit from "../components/ProductEdit"

function Profile(props) {
  const { profile, editProduct, deleteProduct, confirmEdit, editId } = props
  return (
    <>
      <Row>
        <Col md="6">
          <Card>
            <Card.Img variant="top" src={profile.photo} />
            <Card.Body>
              <Card.Title>
                {profile.firstName} {profile.lastName}
              </Card.Title>
              <Card.Text>{profile.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {profile.products?.map(product => {
          if (product._id === editId) {
            return <ProductEdit product={product} confirmEdit={confirmEdit} />
          }
          return (
            <ProductItem product={product} inProfile={true} editProduct={editProduct} deleteProduct={deleteProduct} />
          )
        })}
      </Row>
    </>
  )
}

export default Profile
