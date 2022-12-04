import express from "express";
import router from "./routers/index.js";
import cors from "cors"


export const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json());

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});

