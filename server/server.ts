import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
	private static _instance: Server;
	public app: express.Application;
	public port: number;
	public io: SocketIO.Server;
	private httpServer: http.Server;
	private constructor() {
		this.app = express();
		this.port = SERVER_PORT || 3000;
		this.httpServer = new http.Server(this.app);
		this.io = socketIO(this.httpServer);
		this.escucharSockets();
	}

	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	private escucharSockets() {
		console.log('Escuchando conexiones');
		this.io.on('connect', (cliente) => {
			// Conectar cliente
			socket.conectarCliente(cliente, this.io);

			// Login
			socket.login(cliente, this.io);

			// Mensajes
			socket.mensaje(cliente, this.io);

			// Desconexion de cliente
			socket.desconectar(cliente, this.io);

			// Obtener usuarios
			socket.obtenerUsuarios(cliente, this.io);
		});
	}

	start(callback: VoidFunction) {
		this.httpServer.listen(this.port, callback);
	}
}
