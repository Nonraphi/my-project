import mongoose from "../../../common/database/mongoose.db.js";
const {Schema, model} = mongoose;

const BookSchema = new Schema({
    id:{
        type: Number,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    }
},{timestamps: true})
const BookModel = model('books', BookSchema)

export default BookModel