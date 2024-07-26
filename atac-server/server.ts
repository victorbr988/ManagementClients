import express from 'express';
import cors from 'cors';
import { routerClients } from '@routes/clients';
import { routesMap } from '@/routes/routesMap';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/clients', routerClients);
app.use('/map', routesMap);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use((_req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});