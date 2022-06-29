# qurba-api

### endpoint
* base-url: ~/api/v1
  * auth: ~/auth
    * createUser [post]: ~/register
    * loginUser [post]: ~/login

   * restaurants: ~/restaurant
      * listRestaurants [get]: ~/
      * creatRestaurant [post]: ~/
      * getNearByRestaurants [get]: ~/nearby?len=&lat=&distance=
      * getRestaurantById [get]: ~/:id
      * updateRestaurantByID [patch]: ~/:id
      * deleteRestaurantById [delete]: ~/id

    * user: ~/user
       * getUserByFavCuisine [get]: ~/:cuisine

    
