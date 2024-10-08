import express from "express"
import {fetch, create, update, deleteComment} from "../controller/commentController.js"

const route = express.Router();

route.get("/getallcomments", fetch);
route.post("/create", create);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteComment);


export default route;