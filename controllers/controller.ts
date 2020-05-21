import { Request, Response } from 'express';

export const getMensajes = (req: Request, res: Response) => {
	const body = req.body;
	const params = req.params;
	res.json({
		ok: true,
		mensaje: 'todo bien',
		body,
		params,
	});
};
