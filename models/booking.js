const db = require("../config/db");
const ErrorResponse = require("../utils/ErrorResponse");

const findAll = () => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM booking", (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findAllDetail = () => {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT booking.*, users.full_name, tickets.origin, tickets.destination, tickets.departure FROM booking LEFT JOIN users ON booking.user_id = users.user_id LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id ORDER BY booking_id DESC",
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const findById = (id) => {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT booking.*, tickets.*, airlines.airline_name, airlines.airline_code, airlines.class_category, airlines.facilities, airlines.airline_image FROM booking LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id LEFT JOIN airlines ON booking.airline_id = airlines.airline_id WHERE booking_id = $1",
			[id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const findByUserId = (id) => {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT booking.*, tickets.*, airlines.airline_name, airlines.airline_code, airlines.class_category, airlines.facilities FROM booking LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id LEFT JOIN airlines ON booking.airline_id = airlines.airline_id WHERE user_id = $1",
			[id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const create = (data) => {
	const { airline_id, user_id, ticket_id, total_price, child, adult } = data;
	return new Promise((resolve, reject) => {
		db.query(
			`INSERT INTO booking (airline_id, user_id, ticket_id, total_price, child, adult) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[airline_id, user_id, ticket_id, total_price, child, adult],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const accept = (data) => {
	const { ticket_status, booking_id } = data;
	return new Promise((resolve, reject) => {
		db.query(`UPDATE booking SET ticket_status = $1 WHERE booking_id = $2 RETURNING *`, [ticket_status, booking_id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const cancel = (data) => {
	const { ticket_status, booking_id } = data;
	return new Promise((resolve, reject) => {
		db.query(`UPDATE booking SET ticket_status = $1 WHERE booking_id = $2 RETURNING *`, [ticket_status, booking_id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const destroy = (booking_id) => {
	return new Promise((resolve, reject) => {
		db.query(`DELETE FROM booking WHERE booking_id = $1 RETURNING *`, [booking_id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

module.exports = { findAll, findById, findAllDetail, findByUserId, create, accept, cancel, destroy };
