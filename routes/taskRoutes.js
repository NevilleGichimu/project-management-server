import express from "express"
import {fetch, create, update, deleteTask} from "../controller/taskController.js"

const route = express.Router();

route.get("/getalltasks", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteTask);


export default route;