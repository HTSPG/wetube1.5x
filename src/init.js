import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Comments";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 3693;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
