import assert from 'assert';
import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

var Chess = require('chess.js').Chess;
var chess = new Chess();

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/getMoves', (req, res) => {
		// game.movePiece({ from: { file: 5, rank: 2 }, to: { file: 5, rank: 4 } });
		assert(req.query.file)
		assert(req.query.rank)
		res.json(chess.moves());
	})
	return api;
}
