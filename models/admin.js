const db = require("../config/db");
const ErrorResponse = require("../utils/ErrorResponse");

const findByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.query("SELECT user_id, full_name, email, password, role FROM users WHERE email=$1", [email], (err, result) => {
			if (err) reject(err);
			if (result.rowCount) return resolve(result.rows[0]);

			reject(new ErrorResponse("User not Registered", 404));
		});
	});
};

module.exports = { findByEmail };
