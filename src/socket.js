import io from 'socket.io-client';

const socket = io(
  // 'http://localhost:5000/', //Production
  'http://prod.curaweda.com:3001/', //Development
    {
      transports: ['websocket']
    }
);

export default {
  connect() {
    return new Promise((resolve, reject) => {
      console.log(resolve, reject)
      socket.on('connect', () => {
        console.log('Connected to WS')
        resolve();
      });
      
      socket.on('connect_error', (error) => {
        console.log(error)
        reject(error);
      });
    });
  },
  
  disconnect() {
    socket.disconnect();
  },

  on(event, callback) {
    socket.on(event, callback);
  },

  off(event, callback) {
    socket.off(event, callback);
  },

  emit(event, data) {
    console.log(event)
    socket.emit(event, data);
  }
};
