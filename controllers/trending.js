const model = require("../models/trending");
const modelAirlines = require("../models/airlines");

const getTrending = async (req, res) => {
	try {
		const data = await model.findTrending();
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

const getTenTrending = async (req, res) => {
	try {
		const data = await model.findTenTrending();
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

module.exports = { getTrending, getTenTrending };
