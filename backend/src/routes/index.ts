import { Router } from 'express';
import BookController from '../controllers/bookController';
import PublisherController from '../controllers/publisherController';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Operações relacionadas a livros
 *   - name: Publishers
 *     description: Operações relacionadas a editoras
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro ao criar livro
 */
router.post('/books', BookController.createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', BookController.getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro não encontrado
 */
router.get('/books/:id', BookController.getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza um livro pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       404:
 *         description: Livro não encontrado
 */
router.put('/books/:id', BookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/books/:id', BookController.deleteBook);

/**
 * @swagger
 * /publishers:
 *   post:
 *     summary: Cria uma nova editora
 *     tags: [Publishers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publisher'
 *     responses:
 *       201:
 *         description: Editora criada com sucesso
 *       400:
 *         description: Erro ao criar editora
 */
router.post('/publishers', PublisherController.createPublisher);

/**
 * @swagger
 * /publishers:
 *   get:
 *     summary: Lista todas as editoras
 *     tags: [Publishers]
 *     responses:
 *       200:
 *         description: Lista de editoras retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
 */
router.get('/publishers', PublisherController.getPublishers);

/**
 * @swagger
 * /publishers/{id}:
 *   get:
 *     summary: Busca uma editora pelo ID
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da editora
 *     responses:
 *       200:
 *         description: Editora encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       404:
 *         description: Editora não encontrada
 */
router.get('/publishers/:id', PublisherController.getPublisherById);

/**
 * @swagger
 * /publishers/{id}:
 *   put:
 *     summary: Atualiza uma editora pelo ID
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da editora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publisher'
 *     responses:
 *       200:
 *         description: Editora atualizada
 *       404:
 *         description: Editora não encontrada
 */
router.put('/publishers/:id', PublisherController.updatePublisher);

/**
 * @swagger
 * /publishers/{id}:
 *   delete:
 *     summary: Remove uma editora pelo ID
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da editora
 *     responses:
 *       200:
 *         description: Editora deletada com sucesso
 *       404:
 *         description: Editora não encontrada
 */
router.delete('/publishers/:id', PublisherController.deletePublisher);

export default router;
