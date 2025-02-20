import Express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
dotenv.config();

// Initiate routes

const port = process.env.PORT || 5000;
// Initiate express
const app = Express();


app.use(Express.json());

// Setup “hello world” endpoint

app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome User" });
});
// Start the express server on the relevant port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
