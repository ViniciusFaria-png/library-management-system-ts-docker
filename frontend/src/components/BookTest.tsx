import { useEffect, useState } from 'react';
import { getBooks, createBook } from '../services/bookApi';
import { createPublisher, getPublishers } from '../services/publisherApi';

export default function BookTest() {
  const [books, setBooks] = useState<any[]>([]);
  const [publisherId, setPublisherId] = useState<string | null>(null);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const ensurePublisherExists = async () => {
    const publishers = await getPublishers();
    const existing = publishers.find((p: { name: string; }) => p.name === 'Editora Teste');

    if (existing) {
      setPublisherId(existing._id);
      return existing._id;
    }

    const newPublisher = await createPublisher({ name: 'Editora Teste' });
    setPublisherId(newPublisher._id);
    return newPublisher._id;
  };


  const handleCreate = async () => {

    const id = publisherId || await ensurePublisherExists();
    await createBook({
    title: 'Livro Teste',
    author: 'Autor Teste',
    isbn: 'ISBN-1234',
    publicationYear: 2024,
    publisher: id
  });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
    ensurePublisherExists();
  }, []);

  return (
    <div>
      <h2>Testar Livros</h2>
      <button onClick={handleCreate}>Criar Livro</button>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} — {book.author}</li>
        ))}
      </ul>
    </div>
  );
}
