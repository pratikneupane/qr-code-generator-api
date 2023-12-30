import express from "express";
import bodyParser from "body-parser";
import { toDataURL } from "qrcode";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Generate QR Code
app.post("/generate-qrcode", async (req, res) => {
  const { data } = req.body;

  try {
    if (!data) {
      return res.status(400).json({ error: "Data is required" });
    }

    const options = {
      width: 1080,
      margin: 2,
    };

    const qrCodeImage = await toDataURL(data, options);
    res.json({ qrCodeImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
