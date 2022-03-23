// Schema File
import mongoose from "mongoose"

// 스키마 구조
const boardSchema =  new mongoose.Schema({
    writer: String,
    title: String,
    contents: String,
})

// 모델생성 컬렉션이름 + 스키마구조
export const Board = mongoose.model("Board", boardSchema)