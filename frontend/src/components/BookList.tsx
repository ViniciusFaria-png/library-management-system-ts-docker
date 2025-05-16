import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/bookApi';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      fetchBooks(); // atualiza lista
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.title} — {book.author}
            <button onClick={() => handleDelete(book._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
