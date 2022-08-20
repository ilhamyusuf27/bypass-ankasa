const db = require("../config/db");
const ErrorResponse = require("../utils/ErrorResponse");

const findAll = () => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM tickets", (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findById = (id) => {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT tickets.*,airlines.airline_code, airlines.airline_name, airlines.class_category, airlines.facilities, airlines.airline_image FROM tickets LEFT JOIN airlines ON tickets.airline_id = airlines.airline_id WHERE ticket_id = $1",
			[id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const findDetail = (data) => {
	const { origin, destination, departure, class_category } = data;
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT tickets.*, airlines.airline_name, airlines.class_category FROM tickets LEFT JOIN airlines ON tickets.airline_id = airlines.airline_id WHERE tickets.origin ~* $1 AND tickets.destination ~* $2 AND tickets.departure = $3 AND airlines.class_category = $4 ORDER BY price ASC",
			[origin, destination, departure, class_category],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const create = (data) => {
	const { airline_id, origin, destination, departure, price, stock } = data;
	return new Promise((resolve, reject) => {
		db.query(
			`INSERT INTO tickets (airline_id, origin, destination, departure, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[airline_id, origin, destination, departure, price, stock],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const update = (data) => {
	const { airline_id, origin, destination, departure, price, stock, ticket_id } = data;
	return new Promise((resolve, reject) => {
		db.query(
			`UPDATE tickets SET airline_id = $1, origin = $2, destination = $3, departure = $4, price = $5, stock = $6 WHERE ticket_id = $7 RETURNING *`,
			[airline_id, origin, destination, departure, price, stock, ticket_id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const destroy = (ticket_id) => {
	return new Promise((resolve, reject) => {
		db.query(`DELETE FROM tickets WHERE ticket_id = $1 RETURNING *`, [ticket_id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

module.exports = { findAll, findById, findDetail, create, update, destroy };
