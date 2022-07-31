import styled from 'styled-components'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import { Products } from './pages/Products'
import { Cart } from './pages/Cart'

function App() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
  `

  const Header = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    margin-bottom: 1rem;
    gap: 2rem;
    border-bottom: 1px solid;
  `

  return (
    <BrowserRouter>
      <Container>
        <Header>
          <Link to="/products">
            Products
          </Link>
          <Link to="/cart">
            Carts
          </Link>
        </Header>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
