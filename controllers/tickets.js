const model = require("../models/tickets");
const modelAirlines = require("../models/airlines");

const getAllTickets = async (req, res) => {
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

const getAllTicketsDetail = async (req, res) => {
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

const getDetail = async (req, res) => {
	try {
		const data = await model.findDetail(req.query);
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

const createTicket = async (req, res) => {
	try {
		const { airline_id } = req.body;

		const findAirline = await modelAirlines.findById(airline_id);
		if (!findAirline.rowCount) {
			return res.status(404).json({ message: `Airline with id ${airline_id} not found, please changes another id` });
		}

		const data = await model.create(req.body);
		if (data.rowCount) {
			const getAll = await model.findAllDetail();
			return res.status(200).json({
				data: getAll.rows,
			});
		}
		res.status(404).json({ message: "Data not found" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateTicket = async (req, res) => {
	try {
		let { airline_id, origin, destination, departure, departure_time, price, stock } = req.body;
		const { id } = req.params;
		const data = await model.findById(id);

		if (!data.rowCount) {
			return res.status(404).json({ message: `Ticket with id ${ticket_id} not found` });
		}

		airline_id = airline_id || data.rows[0].airline_id;
		origin = origin || data.rows[0].origin;
		destination = destination || data.rows[0].destination;
		departure = departure || data.rows[0].departure;
		departure_time = departure_time || data.rows[0].departure_time;
		price = price || data.rows[0].price;
		stock = stock || data.rows[0].stock;

		const newData = { airline_id, origin, destination, departure, departure_time, price, stock, ticket_id: id };

		const result = await model.update(newData);
		res.status(200).json({ message: "Ticket already updated", result: result.rows });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const deleteTicket = async (req, res) => {
	try {
		const { id } = req.params;

		const findTicket = await model.findById(id);

		if (!findTicket.rowCount) {
			return res.status(404).json({ message: `Cannot delete ticket with id ${id}, id ticket not found` });
		}

		const data = await model.destroy(id);
		res.status(200).json({ message: `Ticket delete successfully`, result: data.rows });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
module.exports = { getAllTickets, getById, getDetail, createTicket, updateTicket, deleteTicket, getAllTicketsDetail };
