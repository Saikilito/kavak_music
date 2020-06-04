import { Request, Response, NextFunction } from "express";
import CRUD from "./CRUD";

class CountryController extends CRUD {  
}

const country = new CountryController("country");

export default country;