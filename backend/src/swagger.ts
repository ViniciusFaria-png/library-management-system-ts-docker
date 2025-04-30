import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API para gerenciamento de biblioteca',
      contact: {
        name: "Vinícius Faria",
        email: "vinicius.f4ria@gmail.com"
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
            isbn: { type: 'string' },
            publicationYear: { type: 'integer' },
            publisher: { type: 'array', 
                items: {
                    type: 'string',
                }
            }
          },
          required: ['title', 'author', 'isbn']
        },
        Publisher: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              books: { type: 'string'}
            },
            required: ['name']
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}