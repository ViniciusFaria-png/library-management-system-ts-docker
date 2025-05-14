import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import Publisher from '../src/models/Publisher';
import Book from '../src/models/Book';

describe('Book Routes', () => {
  beforeEach(async () => {
    await Book.deleteMany({});
    await Publisher.deleteMany({});
  });

  it('should create a book', async () => {
    const publisher = await Publisher.create({ name: 'Editora XPTO' });

    const res = await request(app)
      .post('/api/books') 
      .send({
        title: 'Livro Teste',
        author: 'Autor Teste',
        isbn: '1234567890',
        publicationYear: 2024,
        publisher: publisher._id,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Livro Teste');
    expect(res.body.publisher).toBe(publisher._id.toString());
  });

  it('should get all books', async () => {
    // Cria um livro de teste
    await Book.create({
      title: 'Outro Livro',
      author: 'Outro Autor',
      isbn: '0987654321',
      publicationYear: 2020,
    });

    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1); 
  });

  it('should return 400 when creating book with missing required fields', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ author: 'Autor Incompleto', title: 'Livro Incompleto' });
   
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 when publisher does not exist', async () => {
    const fakePublisherId = new mongoose.Types.ObjectId();
    
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'Livro com Editora Inexistente',
        author: 'Autor',
        isbn: '1234567890',
        publicationYear: 2024,
        publisher: fakePublisherId
      });
    
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/publisher not found/i);
  });

  it('should get a single book by ID', async () => {
    const book = await Book.create({
      title: 'Livro Específico',
      author: 'Autor',
      isbn: '1234567890',
      publicationYear: 2024,
    });
  
    const res = await request(app).get(`/api/books/${book._id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Livro Específico');
  });

  it('should update a book', async () => {
    const book = await Book.create({
      title: 'Título Antigo',
      author: 'Autor',
      isbn: '0987654321',
      publicationYear: 2020,
    });
  
    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .send({
        title: 'Título Atualizado',
        isbn: '1234567890',
        publicationYear: 2024,
      });
   
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Título Atualizado');
  });

  it('should delete a book', async () => {
    const book = await Book.create({
      title: 'Livro para Deletar',
      author: 'Autor',
      isbn: '1234567890',
      publicationYear: 2024
    });
  
    const res = await request(app).delete(`/api/books/${book._id}`);
    
    expect(res.status).toBe(204);
    
    const deletedBook = await Book.findById(book._id);
    expect(deletedBook).toBeNull();
  });

  it('should return 409 when creating book with duplicate ISBN', async () => {
    const isbn = '1234567890';
    await Book.create({ 
      title: 'Livro 1', 
      author: 'Autor', 
      isbn,
      publicationYear: 2024
    });
    
    const res = await request(app)
      .post('/api/books')
      .send({ 
        title: 'Livro 2', 
        author: 'Autor', 
        isbn,
        publicationYear: 2024
      });
    
    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/duplicate isbn/i);
  });
});