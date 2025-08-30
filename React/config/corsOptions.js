const whiteList = ["http://localhost:5173"];

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin)) {
			//callback(error, allow)
			callback(null, true);
		} else {
			console.log(`Origin: ${origin}`);
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

export default corsOptions;
