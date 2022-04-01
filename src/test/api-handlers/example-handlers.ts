import { rest } from 'msw';
import { someData } from '../data/someData';

export default [
  rest.get('/someUrl/*', async (req, res, ctx) => res(ctx.json(someData))),
];
