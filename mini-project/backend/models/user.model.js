// Schema File
import mongoose from "mongoose"

// 스키마 구조
const userSchema =  new mongoose.Schema({
    name : String,
    email:  String,
    personal : String,
    prefer: String,
    pwd: String,
    phone:String,
    og : Object
})

// 모델생성 컬렉션이름 + 스키마구조
export const User = mongoose.model("User", userSchema)