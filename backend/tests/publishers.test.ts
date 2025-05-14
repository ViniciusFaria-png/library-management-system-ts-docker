import request from 'supertest';
import app from '../src/app';
import Publisher from '../src/models/Publisher';
import Book from '../src/models/Book';

describe('Publisher Routes', () => {
  beforeEach(async () => {
    await Publisher.deleteMany({});
  });

  it('should create a publisher', async () => {
    const res = await request(app)
      .post('/api/publishers')
      .send({
        name: 'Nova Editora',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Nova Editora');
  });

  it('should get all publishers', async () => {
    await Publisher.create({ name: 'Editora Alpha' });

    const res = await request(app).get('/api/publishers');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1);
  });
  
  it('should return 400 when creating publisher without name', async () => {
    const res = await request(app)
      .post('/api/publishers')
      .send({});
    
    expect(res.status).toBe(400);
  });

  it('should get a single publisher by ID', async () => {
    const publisher = await Publisher.create({ name: 'Editora Específica' });

    const res = await request(app).get(`/api/publishers/${publisher._id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Editora Específica');
  });

  it('should update a publisher', async () => {
    const publisher = await Publisher.create({ name: 'Nome Antigo' });

    const res = await request(app)
      .put(`/api/publishers/${publisher._id}`)
      .send({ name: 'Nome Atualizado' });
    
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Nome Atualizado');
  });

  it('should delete a publisher', async () => {
    const publisher = await Publisher.create({ name: 'Editora para Deletar' });

    const res = await request(app).delete(`/api/publishers/${publisher._id}`);
    
    expect(res.status).toBe(204);
    
    const deletedPublisher = await Publisher.findById(publisher._id);
    expect(deletedPublisher).toBeNull();
  });

  it('should prevent deleting publisher with associated books', async () => {
    const publisher = await Publisher.create({ name: 'Editora com Livros' });
    await Book.create({ 
      title: 'Livro Associado', 
      author: 'Autor',
      isbn: '1234567890',
      publicationYear: 2024,
      publisher: publisher._id
    });
  
    const res = await request(app).delete(`/api/publishers/${publisher._id}`);
    
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/cannot delete publisher with associated books/i);
  });
});