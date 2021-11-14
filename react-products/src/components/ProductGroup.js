import { Row } from "react-bootstrap"
import ProductItem from "./ProductItem"
import ProductEdit from "./ProductEdit"

function ProductGroup(props) {
  const { products, editProduct, editId, confirmEdit, deleteProduct } = props
  return (
    <Row xs={2} md={4} className="g-4">
      {products.map(product => {
        if (product._id === editId) {
          return <ProductEdit key={product._id} product={product} confirmEdit={confirmEdit} />
        } else {
          return (
            <ProductItem
              key={product._id}
              inProfile={false}
              product={product}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          )
        }
      })}
    </Row>
  )
}

export default ProductGroup
