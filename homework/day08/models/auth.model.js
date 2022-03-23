// Schema File
import mongoose from "mongoose"

// 스키마 구조
const authSchema =  new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean,
})

// 모델생성 컬렉션이름 + 스키마구조
export const Auth = mongoose.model("Auth", authSchema)