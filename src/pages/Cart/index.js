import styled from 'styled-components'
import { useCart } from './useCart'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export function Cart() {
  const { isLoading, data: cartRes } = useCart()

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <h2>Cart</h2>
      <h6>{cartRes.data.date}</h6>
    </Container>
  )
}
