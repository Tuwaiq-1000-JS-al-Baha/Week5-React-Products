import axios from "axios"
import { useEffect, useState } from "react"
import AddProduct from "./pages/AddProduct"
import Navbar from "./components/Navbar"
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

function App() {
  const [products, setProducts] = useState([])
  const [editId, setEditId] = useState(null)
  const [errorSignup, setErrorSignup] = useState(null)
  const [errorLogin, setErrorLogin] = useState(null)
  const [profile, setProfile] = useState({})
  const navigate = useNavigate()

  const getProducts = () => {
    axios.get("https://vast-chamber-06347.herokuapp.com/api/products").then(response => {
      const productsData = response.data
      setProducts(productsData)
    })
  }

  const getProfile = () => {
    axios
      .get("https://vast-chamber-06347.herokuapp.com/api/user/me", {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then(response => {
        const profileData = response.data
        setProfile(profileData)
      })
  }

  useEffect(() => {
    getProducts()
    if (localStorage.token !== undefined) {
      getProfile()
    }
  }, [])

  const addProduct = e => {
    e.preventDefault()
    const form = e.target
    const productBody = {
      title: form.elements.title.value,
      description: form.elements.description.value,
      quantity: form.elements.quantity.value,
      price: form.elements.price.value,
      category: form.elements.category.value,
      image: form.elements.image.value,
    }
    axios
      .post("https://vast-chamber-06347.herokuapp.com/api/products", productBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then(response => {
        console.log("you have added a product")
        getProducts()
        getProfile()
        navigate("/")
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const editProduct = e => {
    const productId = e.target.id
    setEditId(productId)
  }

  const confirmEdit = e => {
    e.preventDefault()
    const form = e.target
    const productBody = {
      title: form.elements.title.value,
      description: form.elements.description.value,
      quantity: form.elements.quantity.value,
      price: form.elements.price.value,
      category: form.elements.category.value,
      image: form.elements.image.value,
    }
    axios
      .put(`https://vast-chamber-06347.herokuapp.com/api/products/${editId}`, productBody, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then(response => {
        console.log("you have edited the product")
        setEditId(null)
        getProducts()
        getProfile()
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const deleteProduct = e => {
    const productId = e.target.id
    axios
      .delete(`https://vast-chamber-06347.herokuapp.com/api/products/${productId}`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then(response => {
        console.log("you deleted the product")
        getProducts()
        getProfile()
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const signUp = e => {
    e.preventDefault()
    const form = e.target

    const userBody = {
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
      photo: form.elements.photo.value,
    }

    axios
      .post("https://vast-chamber-06347.herokuapp.com/api/user", userBody)
      .then(response => {
        console.log("sign up success")
        setErrorSignup(null)
        navigate("/login")
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorSignup(error.response.data)
      })
  }

  const login = e => {
    e.preventDefault()
    const form = e.target

    const userBody = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    }

    axios
      .post("https://vast-chamber-06347.herokuapp.com/api/user/auth", userBody)
      .then(response => {
        console.log("login success")
        setErrorLogin(null)
        const token = response.data
        localStorage.token = token
        getProfile()
        navigate("/")
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorLogin(error.response.data)
      })
  }

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <>
      <Navbar logout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              editProduct={editProduct}
              editId={editId}
              confirmEdit={confirmEdit}
              deleteProduct={deleteProduct}
              setErrorSignup={setErrorSignup}
            />
          }
        />
        <Route path="/add-product" element={<AddProduct addProduct={addProduct} setErrorSignup={setErrorSignup} />} />
        <Route path="/signup" element={<SignUp signUp={signUp} errorSignup={errorSignup} />} />
        <Route path="/login" element={<Login login={login} errorLogin={errorLogin} />} />
        <Route
          path="/profile"
          element={
            <Profile
              profile={profile}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
              confirmEdit={confirmEdit}
              editId={editId}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
