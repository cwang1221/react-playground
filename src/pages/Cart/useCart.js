import { useQuery } from '@tanstack/react-query'
import { Axios } from '../../libs/axios'

export const useCart = () => useQuery(
  ['carts'],
  () => Axios.get('/carts/5')
)
