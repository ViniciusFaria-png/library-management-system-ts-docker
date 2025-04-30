import { Request, Response } from 'express';
import Book from '../models/Books';

class BookController {
  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
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
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new BookController();
