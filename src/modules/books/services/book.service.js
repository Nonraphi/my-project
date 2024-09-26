import BookModel from "../model/book.schema.js";

const BookService = {
    create: (payload) => {
        return new BookModel(payload).save()
    },
    getAll: (query = {})=>{
        return BookModel.find(query)
    },
    getOneByID : (id = {})=>{
        return BookModel.findOne({id:id})
    },
    updateOneById : (id,payload)=>{
        return BookModel.updateOne({id:id},{$set:payload})
    }
    ,deleteOneById : (id) =>{
        return BookModel.deleteOne({id:id})
        
    }
}

export default BookService