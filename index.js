const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const notFound = require("./routes/notFound");
const errorHandler = require("./middlewares/errorHandler");
const destination = require("./routes/destination");
const airlines = require("./routes/airlines");

const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRouter)
app.use('/users', userRouter);
app.use(destination);
app.use(airlines);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`App is running on port: ${port}`);
});
