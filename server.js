import express from "express";
import "dotenv/config";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

import { sendToBedrock } from "./aws/bedrock.js";

const app = express();
const PORT = process.env.PORT;

//CORS
app.use(cors(corsOptions));
app.use(express.json());

app.post("/api", async (req, res) => {
	try {
		const reply = await sendToBedrock(req.body.prompt);
		res.json({ reply });
	} catch (err) {
		console.error("Error calling Bedrock Agent:", err);
		res.status(500).json({ error: "Failed to get response from Bedrock" });
	}
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
