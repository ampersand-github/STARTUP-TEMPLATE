import { seed } from 'src/service/mocks/db';

if (typeof window === 'undefined') {
  const { server } = require('./server');
  seed();
  // ログ抑制
  server.listen({ onUnhandledRequest: 'bypass' });
} else {
  const { worker } = require('./browser');
  seed();
  worker.start({ onUnhandledRequest: 'bypass' });
}
