import express from "express";
import router from "../routers/index";
const app = express();

const PORT = proces.env.PORT || 3001;

app.use(express.json());
app.use("/api", router);




app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});