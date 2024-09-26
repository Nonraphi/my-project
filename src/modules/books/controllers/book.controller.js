import BookService from '../services/book.service.js'

const BookController = {
    getBookAll: async (req, res) => {
        const books = await BookService.getAll()
        if (!books) return res.status(400).send('Book not found')
            res.status(200).json({ success:true, data:books })
    },
    getBookId: async (req, res) => {
        const {id} = req.params
        const books = await BookService.getOneByID(id)
        if (!books) return res.status(400).send('Book not found')
        res.status(200).json({ success:true, data:books })
    },
    postBook: async (req, res) => {
        const { title, author } = req.body;
    
        if (!title || !author) {
            return res.status(400).json({
                success: false,
                message: "จำเป็นต้องมี title และ author"
            });
        }
    
        const books = await BookService.getAll();
        const lastBook = books[books.length - 1];
        let newId = '1';
    
        if (lastBook) {
            const lastId = lastBook.id;
            const numberPart = parseInt(lastId, 10);
            const newNumberPart = numberPart + 1;
            newId = `${newNumberPart}`;
        }
    
        const create = await BookService.create({ id: newId, title, author });
    
        res.status(201).json({
            success: true,
            data: create
        });
    },
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, author } = req.body;
    
        await BookService.updateOneById(id, { title, author });
        const updatedBook = await BookService.getOneByID(id);
    
        res.status(200).json({
            success: true,
            data: updatedBook
        });
    },
    deleteBook: async (req, res) => {
        const {id} = req.params
        try {
            const result = await BookService.deleteOneById(id)
            if (result.deletedCount === 0) {
                return res.status(404).json({ success: false, message: 'Book not found' })
            }
            res.status(200).json({ success: true, message: 'Book deleted successfully'})
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

}

export default BookController