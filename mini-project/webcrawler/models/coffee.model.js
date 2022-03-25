// Schema File
import mongoose from "mongoose"

// 스키마 구조
const starbucksSchema =  new mongoose.Schema({
    name:String,
    img:String,
})

// 모델생성 컬렉션이름 + 스키마구조
export const StarBucks = mongoose.model("StarBucks", starbucksSchema)