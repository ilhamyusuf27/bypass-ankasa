const model = require("../models/destination");
const cloudinary = require("../config/cloudinary");

const getAllPlace = async (req, res) => {
	try {
		const data = await model.getAll();
		if (data.rowCount) {
			return res.status(200).json({
				total: data.rowCount,
				data: data.rows,
			});
		}
		res.status(404).json({ message: "Data not found" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await model.findById(id);
		if (data.rowCount) {
			return res.status(200).json({
				data: data.rows,
			});
		}
		res.status(404).json({ message: "Data not found" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getByName = async (req, res) => {
	try {
		const { name } = req.params;
		const data = await model.findByName(name);
		if (data.rowCount) {
			return res.status(200).json({
				data: data.rows,
			});
		}
		res.status(404).json({ message: "Data not found" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const addData = async (req, res) => {
	try {
		let { country, city, airport_name } = req.body;
		country = country.trim();
		city = city.trim();
		airport_name = airport_name.trim();

		const destination = {
			country,
			city,
			airport_name,
		};

		const destinationImage = req?.file?.path;
		let uploaded;

		if (destinationImage) {
			const uploadImage = await cloudinary.uploader.upload(destinationImage, {
				folder: "ankasa",
			});

			uploaded = uploadImage.secure_url;
		}

		destination.destination_image = uploaded;

		const newPlace = await model.create(destination);

		res.status(201).json({
			message: `Successfully create new Destination`,
			result: newPlace.rows,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateData = async (req, res) => {
	try {
		const { id } = req.params;
		let { country, city, airport_name } = req.body;
		const destinationImage = req?.file?.path;
		const findData = await model.findById(id);

		country = country.trim();
		city = city.trim();
		airport_name = airport_name.trim();

		if (findData.rowCount === 0) {
			return res.status(404).json({
				message: `Data not found`,
			});
		}

		let uploaded;

		if (destinationImage) {
			const uploadImage = await cloudinary.uploader.upload(destinationImage, {
				folder: "ankasa",
			});

			uploaded = uploadImage.secure_url;
		}

		let countryName = country || findData.rows[0].country;
		let cityName = city || findData.rows[0].city;
		let airportName = airport_name || findData.rows[0].airport_name;
		let imageName = uploaded || findData.rows[0].destination_image;

		const newData = { country: countryName, city: cityName, airport_name: airportName, destination_image: imageName };

		const data = await model.update(newData);

		res.status(201).json({
			message: `Successfully update Destination with id=${id}`,
			result: data.rows,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const deleteData = async (req, res) => {
	try {
		const { id } = req.params;
		const findData = model.findById(id);

		if (findData.rowCount === 0) {
			return res.status(404).json({
				message: `Cannot delete id=${id} because data not registered`,
			});
		}

		const data = await model.destroy(id);
		res.status(200).json({
			message: `Successfully delete destination with id of ${id}`,
			result: data.rows,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = { getAllPlace, getById, getByName, addData, updateData, deleteData };
