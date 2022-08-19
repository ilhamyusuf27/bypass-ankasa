const db = require("../config/db");
const ErrorResponse = require("../utils/ErrorResponse");

const findTrending = () => {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT booking.ticket_id, COUNT(*), destination.country, destination.city, destination.destination_image FROM booking LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id LEFT JOIN destination ON tickets.destination = destination.city GROUP BY booking.ticket_id ,destination.country, destination.city, destination.destination_image ORDER BY COUNT(*) DESC LIMIT 5",
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const findTenTrending = () => {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT booking.ticket_id, COUNT(*), destination.country, destination.city, destination.destination_image FROM booking LEFT JOIN tickets ON booking.ticket_id = tickets.ticket_id LEFT JOIN destination ON tickets.destination = destination.city GROUP BY booking.ticket_id ,destination.country, destination.city, destination.destination_image ORDER BY COUNT(*) DESC LIMIT 10",
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

module.exports = { findTrending, findTenTrending };
