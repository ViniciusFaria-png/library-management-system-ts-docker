import { Request, Response } from 'express';
import Book from '../models/Book';
import Publisher from '../models/Publisher';

class BookController {
  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const { publisher } = req.body;
  
      const { title, author, isbn, publicationYear } = req.body;
      if (!title || !author || !isbn || !publicationYear) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      let publisherId = null;
  
      if (publisher) {
      if (!publisher.match(/^[0-9a-fA-F]{24}$/)) {
        const foundPublisher = await Publisher.findOne({ name: publisher });
        if (!foundPublisher) {
          res.status(404).json({ error: 'Publisher not found' });
          return;
        }
        publisherId = foundPublisher._id;
      } else {
        const publisherExists = await Publisher.findById(publisher);
        if (!publisherExists) {
          res.status(404).json({ error: 'Publisher not found' });
          return;
        }
        publisherId = publisher;
      }
    }

  
      const book = new Book({
      title,
      author,
      isbn,
      publicationYear,
      publisher: publisherId ?? undefined
    });
    
      await book.save();
      res.status(201).json(book);
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409).json({ error: 'Duplicate ISBN' });
        return;
      }
      res.status(400).json({ error: error.message });
    }
  }

  async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await Book.find().populate('publisher');
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const book = await Book.findById(req.params.id).populate('publisher');
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateBook(req: Request, res: Response): Promise<void> {
    try {

      if(req.body.publisher){
        const publisherExists = await Publisher.findById(req.body.publisher);
        if(!publisherExists){
          res.status(404).json({error: 'Publisher not found'});
          return;
        }
      }


      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new BookController();
