// Schema File
import mongoose from "mongoose"

// 스키마 구조
const stockSchema =  new mongoose.Schema({
    name:String,
    date:Date,
    price:Number
})

// 모델생성 컬렉션이름 + 스키마구조
export const Stock = mongoose.model("Stock", stockSchema)