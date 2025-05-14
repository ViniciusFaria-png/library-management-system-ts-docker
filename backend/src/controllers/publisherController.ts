import { Request, Response } from 'express';
import Publisher from '../models/Publisher';
import Book from '../models/Book';

class PublisherController {
  async createPublisher(req: Request, res: Response): Promise<void> {
    try {
      const publisher = new Publisher(req.body);
      await publisher.save();
      res.status(201).json(publisher);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getPublishers(req: Request, res: Response): Promise<void> {
    try {
      const publishers = await Publisher.find();

      const publishersWithBooks = await Promise.all(
        publishers.map(async(publisher) => {
          const books = await Book.find({publisher: publisher._id});
          return {
            ...publisher.toObject(),
            books,
          }
        })
      );

      res.json(publishersWithBooks);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getPublisherById(req: Request, res: Response): Promise<void> {
    try {
      const publisher = await Publisher.findById(req.params.id);
      if (!publisher) {
        res.status(404).json({ error: 'Publisher not found' });
        return;
      }

      const books = await Book.find({publisher: publisher._id});

      res.json({
        ...publisher.toObject(),
        books,
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updatePublisher(req: Request, res: Response): Promise<void> {
    try {
      const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!publisher) {
        res.status(404).json({ error: 'Publisher not found' });
        return;
      }
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deletePublisher(req: Request, res: Response): Promise<void> {
    try {

      const publisherId = req.params.id;
      const books = await Book.find({publisher: publisherId});

      if (books.length > 0){
        res.status(400).json({ error: 'Cannot delete publisher with associated books'});
        return;
      }

      const publisher = await Publisher.findByIdAndDelete(publisherId);
      if (!publisher) {
        res.status(404).json({ error: 'Publisher not found' });
        return;
      }
      res.status(204).json({ message: 'Publisher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new PublisherController();
