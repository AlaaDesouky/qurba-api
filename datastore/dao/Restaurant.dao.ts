import { Restaurant } from '../../types'

export interface RestaurantDao {
  listRestaurant(): Promise<Restaurant[]>
  createRestaurant(restaurant: Restaurant): Promise<void>
  getRestaurant(id: string): Promise<Restaurant | undefined>
  deleteRestaurant(id: string): Promise<void>
}