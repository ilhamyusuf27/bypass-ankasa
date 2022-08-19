const multer = require("multer");
const ONE_MEGA_BYTE = 1024 * 1024;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images");
	},
	filename: (req, file, cb) => {
		const validName = file.originalname.split(" ").join("-");
		const randomNumber = Math.round(Math.random() * 1e9);
		const uniqueName = `${Date.now()}-${randomNumber}-${validName}`;

		cb(null, uniqueName);
	},
});

const fileFilter = (req, file, cb) => {
	const isValidMimeType = file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg";

	if (isValidMimeType) return cb(null, true);
	cb(new Error("Only accept .png, .jpg, .jpeg image format"), false);
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: ONE_MEGA_BYTE },
});

module.exports = upload;
