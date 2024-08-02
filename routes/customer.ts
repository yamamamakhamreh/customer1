import { Router, Request, Response, NextFunction } from "express";
import {
  createCustomer,
  getCustomer,
  getAllCustomers,
  deleteCustomer,
  editCustomer, 
} from "../controllers/customer.js";
import { logRequestMiddleware } from "../middleware/printInfoMiddleware.js";
import { Customer } from "../db/entities/Customer.js";


const router = Router();


router.get("/", async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const balance = Number(req.params.balance);
    const customer = await getCustomer(balance);

    res.json({
      message: "Customer retrieved successfully",
      success: true,
      customer,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});


  router.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const name = (req.params.name);

    try {
        const customer = await deleteCustomer(name)

        res.json({
            messege:"Customer deleted successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})


router.get("/:id", logRequestMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllCustomers(req, res);
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});





router.post("/", async (req:Request, res:Response, next:NextFunction)=>{

  const payload:Customer = req.body;

  if(!payload.name || !payload.mobilePhone||!payload.balance ){
      res.json({
          messege:"Some feilds are missing",
          success: false
      })
      return;
  }
  try {
      const task = await createCustomer(payload)

      res.json({
          messege:"Customer created successfully",
          success: true
      })
  } catch (error) {
      console.log("Error" + error);
      next(error)
  }
})



router.put("/:id", async (req:Request, res:Response, next:NextFunction)=>{

  const name = (req.params.name);
  const payload :Customer = req.body;

  try {
      const customer = await editCustomer(name, payload)

      res.json({
          messege:"Customer edited successfully",
          success: true
      })
  } catch (error) {
      console.log("Error" + error);
      next(error)
  }
})

export default router;