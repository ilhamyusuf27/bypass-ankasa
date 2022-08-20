const model = require("../models/booking");

const getAllBooking = async (req, res) => {
	try {
		const data = await model.findAll();
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

const getAllDetail = async (req, res) => {
	try {
		const data = await model.findAllDetail();
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
				total: data.rowCount,
				data: data.rows,
			});
		}
		res.status(404).json({ message: "Data not found" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getByUserId = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await model.findByUserId(id);
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

const booking = async (req, res) => {
	try {
		const data = await model.create(req.body);
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

const acceptAdmin = async (req, res) => {
	try {
		let { ticket_status } = req.body;
		const { id } = req.params;
		const data = await model.findById(id);

		if (!data.rowCount) {
			return res.status(404).json({ message: `Booking with id ${id} not found` });
		}

		const newData = { ticket_status, booking_id: id };

		await model.accept(newData);
		const update = await model.findAllDetail();
		res.status(200).json({ message: "Booking already updated", result: update.rows });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const cancelBooking = async (req, res) => {
	try {
		let { ticket_status } = req.body;
		const { id } = req.params;
		const data = await model.findById(id);

		if (!data.rowCount) {
			return res.status(404).json({ message: `Booking with id ${id} not found` });
		}

		if (data.rows[0].ticket_status === "success") {
			return res.status(200).json({ message: `Cannot cancel ticket, because transaction is success` });
		}

		const newData = { ticket_status, booking_id: id };

		const result = await model.cancel(newData);
		res.status(200).json({ message: "Booking already updated", result: result.rows });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const deleteData = async (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	const findTicket = await model.findById(id);

	if (!findTicket.rowCount) {
		return res.status(404).json({ message: `Cannot delete booking with id ${id}, id booking not found` });
	}

	const data = await model.destroy(id);
	res.status(200).json({ message: `Data booking delete successfully`, result: data.rows });
};
module.exports = { getAllBooking, getAllDetail, getById, getByUserId, booking, acceptAdmin, cancelBooking, deleteData };
