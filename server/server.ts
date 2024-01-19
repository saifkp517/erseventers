import express, {type Request, type Response} from "express";
import cors from "cors";
import { eventRouter } from "./router/eventRouter";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('images'))

app.use("/event", eventRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
