import { rest, RestRequest } from 'msw';
import { db } from './db';
import { IBookWithoutId } from './db/models/book';
import { uuidv4 } from '@mswjs/interceptors/lib/utils/uuid';

export const handlers = [
  rest.get(`/api/book`, (req, res, ctx) => {
    const all = db.book.getAll();
    return res(ctx.status(200), ctx.json(all));
  }),

  rest.get('/api/book/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (typeof id === 'string') {
      const result = db.book.findFirst({ where: { id: { equals: id } } });
      if (result) return res(ctx.status(200), ctx.json(result));
    }
    return res(ctx.status(404));
  }),

  rest.put('/api/book/:id', (req: RestRequest<IBookWithoutId>, res, ctx) => {
    const { id } = req.params;
    console.log('----');
    console.log(id);
    if (typeof id === 'string') {
      db.book.update({
        where: { id: { equals: id } },
        data: {
          title: req.body.title,
          price: req.body.price,
        },
      });
      return res(ctx.status(201));
    }
  }),

  rest.post('/api/book', (req: RestRequest<IBookWithoutId>, res, ctx) => {
    console.log('---');
    console.log(req.body);
    console.log(uuidv4().toString());
    const a = db.book.create({
      id: uuidv4().toString(),
      title: req.body.title,
      price: req.body.price,
    });
    console.log(a);
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
