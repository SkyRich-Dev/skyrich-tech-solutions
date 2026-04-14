import "dotenv/config";
import app from "./app";

const rawPort = process.env["PORT"] ?? process.env["API_PORT"] ?? "3003";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
