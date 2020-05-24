import { Request, Response } from 'express';
import Server from '../server/server';
import { usuariosConectados } from '../sockets/sockets';

export const getMensajesPrivados = (req: Request, res: Response) => {
	const body = req.body;
	const id = req.params.id;
	const server = Server.instance;
	const payload = {
		de: body.de,
		cuerpo: body.cuerpo,
	};
	server.io.in(id).emit('mensaje-privado', payload);
	res.json({
		ok: true,
		payload,
	});
};

export const getMensajes = (req: Request, res: Response) => {
	const body = req.body;
	const server = Server.instance;
	const payload = {
		de: body.de,
		cuerpo: body.cuerpo,
	};
	server.io.emit('mensaje-nuevo', payload);
	res.json({
		ok: true,
		payload,
	});
};

export const getUsuarios = (req: Request, res: Response) => {
	const server = Server.instance;
	server.io.clients((err: any, clientes: string[]) => {
		if (err) {
			return res.json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			clientes,
		});
	});
};

export const getUsuariosDetalle = (req: Request, res: Response) => {
	const server = Server.instance;
	res.json({
		ok: true,
		clientes: usuariosConectados.getLista(),
	});
};
