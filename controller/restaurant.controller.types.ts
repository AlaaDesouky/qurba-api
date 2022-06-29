import { Restaurant } from '../types'

//-- List restaurant functionality types --//
export type listRestaurantsRequest = {}
export interface listRestaurantsResponse {
  success: boolean, count: number, data: Restaurant[]
}

//-- get restaurant functionality types --//
export type getRestaurantRequest = {}
export interface getRestaurantResponse {
  success: boolean, data: Restaurant
}

//-- create restaurant functionality types --//
export type createRestaurantsRequest = Pick<Restaurant, 'name' | 'cuisine' | 'location'>
export interface createRestaurantsResponse {
  success: boolean, message: string, data: Restaurant
}

//-- update restaurant functionality types --//
export type updateRestaurantsRequest = Pick<Restaurant, 'name' | 'cuisine' | 'location'>
export interface updateRestaurantsResponse {
  success: boolean, message: string, data: Restaurant
}

//-- delete restaurant functionality types --//
export type deleteRestaurantsRequest = {}
export interface deleteRestaurantsResponse {
  success: boolean, message: string
}

//-- get nearby restaurants --//
export type getNearbyRestaurantRequest = {}
export interface getNearbyRestaurantResponse {
  success: boolean, count: number, data: Restaurant[] | []
}