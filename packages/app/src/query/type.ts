import {number, string} from "prop-types";

export enum AnimeSortType {
  popularity = "POPULARITY",
  status = "STATUS",
  trending = "TRENDING",
  score = "SCORE",
  duration = "DURATION"
}

type ProductItem = {
  id : number
  title: string
  price: number
  discount: number
  imgUrl: string
}

type Warehouse = {
  id : number
  name: string
}

type ItemAvailibility = {
  id: number
  productId: number
  warehouseId: number
  quantity: number
}