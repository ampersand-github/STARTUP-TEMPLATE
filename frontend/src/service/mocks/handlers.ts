import { rest, RestRequest } from 'msw';
import { db } from './db';
import { IBook, IBookWithoutId } from './db/models/book';
import { uuidv4 } from '@mswjs/interceptors/lib/utils/uuid';

export const handlers = [
  rest.get(`/api/book`, (req, res, ctx) => {
    const all = db.book.getAll();
    console.log(all);
    return res(ctx.json(all));
  }),

  rest.get('/api/book/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (typeof id === 'string') {
      const result = db.book.findFirst({ where: { id: { equals: id } } });
      return res(ctx.json(result));
    }
  }),

  rest.put('/api/book/:id', (req: RestRequest<IBook>, res, ctx) => {
    const { id } = req.params;
    if (typeof id === 'string') {
      const result = db.book.update({
        where: { id: { equals: id } },
        data: {
          title: req.body.title,
          price: req.body.price,
        },
      });
      return res(ctx.json(result));
    }
  }),

  rest.post('/api/book', (req: RestRequest<IBookWithoutId>, res, ctx) => {
    console.log('---');
    console.log(req.body);
    console.log(uuidv4().toString());
    db.book.create({
      id: uuidv4().toString(),
      title: req.body.title,
      price: req.body.price,
    });
    return res(ctx.status(201));
  }),

  rest.delete(`/api/book/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (typeof id === 'string') {
      db.book.delete({ where: { id: { equals: id } } });
      return res(ctx.status(201));
    }
  }),
];
