import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";

const PORT = 4000;
const server = app.listen(PORT, async () => {
  
  console.log(`Server started on port: ${PORT}`)
});

