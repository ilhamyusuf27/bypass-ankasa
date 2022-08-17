const db = require("../config/db");

const getAll = () => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM facilities`, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findById = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM destination WHERE destination_id = $1`, [id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const findByName = (name) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM destination WHERE destination_id ~* $1`, [name], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const create = (data) => {
	const { country, city, airport_name, destination_image } = data;
	return new Promise((resolve, reject) => {
		db.query(`INSERT INTO destination (country, city, airport_name) VALUES ($1, $2, $3, $4) RETURNING *`, [country, city, airport_name, destination_image], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const update = (data) => {
	const { country, city, airport_name, destination_image } = data;
	return new Promise((resolve, reject) => {
		db.query(`UPDATE destination SET country=$1, city=$2, airport_name=$3, destination_image=$4 RETURNING *`, [country, city, airport_name, destination_image], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

const destroy = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`DELETE FROM destination WHERE id=$1 RETURNING *`, [id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

module.exports = { getAll, findById, findByName, create, update, destroy };
