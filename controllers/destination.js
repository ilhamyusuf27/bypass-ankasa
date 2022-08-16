const model = require("../models/destination");

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
		res.status(400).json({ message: "Program error" });
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
		res.status(400).json({ message: "Program error" });
	}
};

const getByName = async (req, res) => {
	try {
		const { name } = req.body;
		const data = await model.findByName(name);
		if (data.rowCount) {
			return res.status(200).json({
				data: data.rows,
			});
		}
		res.status(404).json({ message: "Data not found" });
	} catch (error) {
		res.status(400).json({ message: "Program error" });
	}
};

// Cloudinary not included, please add later
const addData = async (req, res) => {
	try {
		const destination = { ...req.body };
		await model.create(destination);
		res.status(201).json({
			message: `Successfully create new Destination`,
		});
	} catch (error) {
		res.status(400).json({ message: "Program error" });
	}
};

// Cloudinary not included, please add later
const updateData = async (req, res) => {
	try {
		const { id } = req.params;
		const { country, city, airport_name, destination_image } = req.body;
		const findData = await model.findById(id);

		if (findData.rowCount === 0) {
			return res.status(404).json({
				message: `Data not found`,
			});
		}

		let countryName = country || findData.rows[0].country;
		let cityName = city || findData.rows[0].cityName;
		let airportName = airport_name || findData.rows[0].airport_name;
		let imageName = destination_image || findData.rows[0].destination_image;

		const newData = { countryName, cityName, airportName, imageName };

		await model.update(newData);

		res.status(201).json({
			message: `Successfully update Destination with id=${id}`,
		});
	} catch (error) {
		res.status(400).json({ message: "Program error" });
	}
};

const deleteData = (req, res) => {
	try {
		const { id } = req.params;
		const findData = model.findById(id);

		if (findData.rowCount === 0) {
			return res.status(404).json({
				message: `Cannot delete id=${id} because data not registered`,
			});
		}

        await model.destroy(id)
        res.status(200).json({
            message: `Successfully delete destination with id of ${id}`
        })
	} catch (error) {
        res.status(400).json({
            message: `Program error`
        })
    }
};

module.exports= {getAllPlace, getById, getByName, addData, updateData, deleteData}
