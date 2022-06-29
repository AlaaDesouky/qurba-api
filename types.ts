import { RequestHandler } from 'express'

export interface User {
  id: string,
  email: string,
  password: string,
  fullName: string,
  favCuisine: string[],
  restaurants: string[],
  location: {
    type: string,
    coordinates: [lng: number, lat: number]
  },
  createdAt: Date
}

export interface Restaurant {
  id: string,
  name: string,
  slug: string,
  cuisine: string[],
  location: {
    type: string,
    coordinates: [lng: number, lat: number]
  }
  createdAt: Date,
  createdBy: User
}

// Custom type to handle requests and responses
export type ExpressHandler<Req, Res> = RequestHandler<
  any,
  Partial<Res>,
  Partial<Req>,
  any
>;

// Jwt object type
export type JwtObject = { sub: string, email: string }
