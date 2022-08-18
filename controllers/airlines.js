const model = require("../models/airlines");
const cloudinary = require("../config/cloudinary");

const getAllAirlines = async (req, res) => {
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
		let { airline_code, airline_name, class_category, price_adult, price_child, facilities1, facilities2, facilities3, refundable, reschedulable } = req.body;
		const fileImage = req?.file?.path;
		let uploaded;
		let facilities = [];

		const checkAirlines = await model.findByAirlineCode(airline_code);
		if (checkAirlines.rowCount) {
			return res.status(400).json({ message: `Airline code already taken` });
		}

		airline_code = airline_code.trim();
		airline_name = airline_name.trim();
		price_adult = price_adult.trim();
		price_child = price_child.trim();

		if (fileImage) {
			const uploadImage = await cloudinary.uploader.upload(fileImage, {
				folder: "ankasa-airlines",
			});

			uploaded = uploadImage.secure_url;
		}

		if (facilities1) {
			facilities.push(facilities1);
		}
		if (facilities2) {
			facilities.push(facilities2);
		}
		if (facilities3) {
			facilities.push(facilities3);
		}

		const airlineData = {
			airline_code,
			airline_name,
			price_adult,
			price_child,
			airline_image: uploaded,
			class_category,
			facilities,
			refundable,
			reschedulable,
		};

		const newAirline = await model.create(airlineData);

		res.status(201).json({
			message: `Successfully create new airline`,
			result: newAirline.rows,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const updateData = async (req, res) => {
	try {
		const { id } = req.params;
		let { airline_code, airline_name, class_category, price_adult, price_child, facilities1, facilities2, facilities3, refundable, reschedulable } = req.body;
		const fileImage = req?.file?.path;
		let uploaded;
		let facilities = [];

		const findData = await model.findById(id);

		airline_code = airline_code.trim();
		airline_name = airline_name.trim();
		price_adult = price_adult.trim();
		price_child = price_child.trim();

		if (findData.rowCount === 0) {
			return res.status(404).json({
				message: `Data not found`,
			});
		}

		if (fileImage) {
			const uploadImage = await cloudinary.uploader.upload(fileImage, {
				folder: "ankasa-airlines",
			});

			uploaded = uploadImage.secure_url;
		}
		console.log(findData?.rows[0].facilities);

		airline_code = airline_code || findData.rows[0].airline_code;
		airline_name = airline_name || findData.rows[0].airline_name;
		class_category = class_category || findData.rows[0].class_category;
		price_adult = price_adult || findData.rows[0].price_adult;
		price_child = price_child || findData.rows[0].price_child;
		refundable = refundable || findData.rows[0].refundable;
		reschedulable = reschedulable || findData.rows[0].reschedulable;
		let airline_image = uploaded || findData.rows[0].airline_image;

		const checkFacilities1 = facilities1 || findData.rows[0].facilities[0] !== null || undefined;
		const checkFacilities2 = facilities2 || findData.rows[0].facilities[1] !== null || undefined;
		const checkFacilities3 = facilities3 || findData.rows[0].facilities[2] !== null || undefined;

		if (checkFacilities1) {
			facilities.push(facilities1 || findData.rows[0].facilities[0]);
		}
		if (checkFacilities2) {
			facilities.push(facilities2 || findData.rows[0].facilities[1]);
		}
		if (checkFacilities3) {
			facilities.push(facilities3 || findData.rows[0].facilities[2]);
		}

		const updatedData = { airline_code, airline_name, class_category, class_category, price_adult, price_child, facilities, refundable, reschedulable, airline_image, airline_id: id };

		const data = await model.update(updatedData);

		res.status(201).json({
			message: `Successfully update Airlines with id=${id}`,
			result: data.rows,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const deleteData = async (req, res) => {
	try {
		const { id } = req.params;
		const findData = model.findById(id);

		if (findData.rowCount === 0) {
			return res.status(404).json({
				message: `Cannot delete id=${id} because airlines not registered`,
			});
		}

		const data = await model.destroy(id);
		res.status(200).json({
			message: `Successfully delete airlines with id of ${id}`,
			result: data.rows,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = { getAllAirlines, getById, getByName, addData, updateData, deleteData };
