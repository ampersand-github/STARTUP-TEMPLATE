import { seed } from 'src/service/mocks/db';

if (typeof window === 'undefined') {
  const { server } = require('./server');
  seed();
  server.listen();
} else {
  const { worker } = require('./browser');
  seed();
  worker.start();
}
