import { Server } from 'ws';
import { Server as HTTPServer } from 'http';

let wss: Server;

export function initWebSocket(server: HTTPServer) {
  wss = new Server({ server });

  wss.on('connection', ws => {
    console.log('Client connected');
  });
}

export function broadcast(data: any) {
  wss.clients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
