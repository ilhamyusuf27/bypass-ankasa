const db = require("../config/db");

const getAll = () => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM airlines`, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findById = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM airlines WHERE airline_id = $1`, [id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findByName = (name) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM airlines WHERE airline_name ~* $1 OR airline_code ~* $1 OR class_category`, [name], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findByAirlineCode = (airline_code) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM airlines WHERE airline_code ~* $1`, [airline_code], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const create = (data) => {
	const { airline_code, airline_name, airline_image, class_category, price_adult, price_child, facilities, refundable, reschedulable, pic, phone } = data;
	return new Promise((resolve, reject) => {
		db.query(
			`INSERT INTO airlines (airline_code, airline_name, airline_image, class_category, price_adult, price_child, facilities, refundable, reschedulable, pic, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
			[airline_code, airline_name, airline_image, class_category, price_adult, price_child, facilities, refundable, reschedulable, pic, phone],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const update = (data) => {
	const { airline_code, airline_name, airline_image, class_category, price_adult, price_child, facilities, refundable, reschedulable, pic, phone, airline_id } = data;
	return new Promise((resolve, reject) => {
		db.query(
			`UPDATE airlines SET airline_code =$1, airline_name=$2, airline_image=$3, class_category=$4, price_adult=$5, price_child=$6, facilities=$7, refundable=$8, reschedulable=$9, pic=$10, phone=$11 WHERE airline_id = $12 RETURNING *`,
			[airline_code, airline_name, airline_image, class_category, price_adult, price_child, facilities, refundable, reschedulable, pic, phone, airline_id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

const destroy = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`DELETE FROM airlines WHERE airline_id=$1 RETURNING *`, [id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

module.exports = { getAll, findById, findByName, create, update, destroy, findByAirlineCode };
