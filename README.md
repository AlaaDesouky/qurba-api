# qurba-api

### endpoint
* base-url: ~/api/v1
  * auth: ~/auth
    * createUser [post]: ~/register
    * loginUser [post]: ~/login

   * restaurants: ~/restaurant
      * listRestaurants [get]: ~/
      * filterRestaurants [get]: ~?cuisine[in]=
      * creatRestaurant [post]: ~/
      * getNearByRestaurants [get]: ~/nearby?len=&lat=&distance=
      * getRestaurantById|Slug [get]: ~/:id
      * updateRestaurantByID|Slug [patch]: ~/:id
      * deleteRestaurantById|Slug [delete]: ~/id

    * user: ~/user
       * getUserByFavCuisine [get]: ~/:cuisine

    
