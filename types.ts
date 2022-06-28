export interface User {
  id: string,
  email: string,
  fullName: string,
  favCuisine: string[],
  restaurants: string[],
  location: string
}

export interface restaurant {
  id: string,
  name: string,
  codename: string,
  cuisine: string[],
  location: string,
  userId: string
}