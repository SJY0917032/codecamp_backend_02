// Schema File
import mongoose from "mongoose"

// 스키마 구조
const tokenSchema =  new mongoose.Schema({
    token:String,
    phone:String,
    isAuth:false
})

// 모델생성 컬렉션이름 + 스키마구조
export const Token = mongoose.model("Token", tokenSchema)