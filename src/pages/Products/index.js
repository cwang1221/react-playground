import styled from 'styled-components'
import { useProducts } from './useProducts'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export function Products() {
  const { isLoading, data: productsRes } = useProducts()

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <h2>Products</h2>
      <ul>
        {productsRes.data && productsRes.data.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </Container>
  )
}
