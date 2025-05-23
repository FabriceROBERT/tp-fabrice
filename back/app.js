const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
app.use(express.json());

const PORT = 8080;

dotenv.config();

app.use(cors({ origin: "*" }));

mongoose
  .connect(
    "mongodb+srv://fabrice95:I6ybkWTWkMVyDrct@cluster0.kjg9ofs.mongodb.net/TP-Fabrice?retryWrites=true&w=majority&appName=Cluster0",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/users", require("./routes/userRoutes"));
app.use("/ads", require("./routes/adRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//  ;
