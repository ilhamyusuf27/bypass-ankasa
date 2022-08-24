const model = require("../models/admin");

const login = async (req, res, next) => {
	try {
		const { email } = req.body;

		const user = await model.findByEmail(email);
		if (!user) {
			return res.status(404).json({ message: "Email not found" });
		}

		if (user?.role !== "admin") {
			return res.status(403).json({ message: "Kamu bukan admin" });
		}

		req.user = user;
		req.payload = {
			userId: user.user_id,
			email: user.email,
			fullName: user.full_name,
			role: user?.role,
		};

		next();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = { login };
