const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT || 8080);
const serviceName = process.env.SERVICE_NAME || 'platform-backend';
const environment = process.env.ENVIRONMENT || 'exercise';
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

app.use(cors({ origin: allowedOrigin === '*' ? true : allowedOrigin }));
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: serviceName,
    environment,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/message', (_req, res) => {
  res.status(200).json({
    title: 'Deployment activity app',
    message: 'Frontend is successfully connected to the backend service.',
    service: serviceName,
    environment,
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (_req, res) => {
  res.status(200).json({
    service: serviceName,
    environment,
    port,
    nodeVersion: process.version,
    hostname: process.env.K_SERVICE || require('os').hostname()
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on ${port}`);
});
