import express from "express"
import {fetch, create, update, deleteProject} from "../controller/projectController.js"

const route = express.Router();

route.get("/getallprojects", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteProject);


export default route;