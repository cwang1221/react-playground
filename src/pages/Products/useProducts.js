import { useQuery } from '@tanstack/react-query'
import { Axios } from '../../libs/axios'

export const useProducts = () => useQuery(
  ['products'],
  () => Axios.get('/products')
)
