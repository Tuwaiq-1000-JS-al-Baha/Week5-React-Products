import ProductGroup from "../components/ProductGroup"

function Home(props) {
  const { products, editProduct, editId, confirmEdit, deleteProduct, setErrorSignup } = props
  setErrorSignup(null)
  return (
    <>
      <h1>Products</h1>
      <ProductGroup
        products={products}
        editProduct={editProduct}
        editId={editId}
        confirmEdit={confirmEdit}
        deleteProduct={deleteProduct}
      />
    </>
  )
}

export default Home
