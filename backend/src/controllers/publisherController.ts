import { Request, Response } from 'express';
import Publisher from '../models/Publisher';

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
      const publishers = await Publisher.find().populate('books');
      res.json(publishers);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getPublisherById(req: Request, res: Response): Promise<void> {
    try {
      const publisher = await Publisher.findById(req.params.id).populate('books');
      if (!publisher) {
        res.status(404).json({ error: 'Publisher not found' });
        return;
      }
      res.json(publisher);
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
      const publisher = await Publisher.findByIdAndDelete(req.params.id);
      if (!publisher) {
        res.status(404).json({ error: 'Publisher not found' });
        return;
      }
      res.json({ message: 'Publisher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new PublisherController();
