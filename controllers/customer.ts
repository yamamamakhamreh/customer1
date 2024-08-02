import { Request, Response } from "express";
import { Customer } from "../db/entities/Customer.js";
import { AppError } from "../errors/AppError.js";



const createCustomer = async (payload:Customer)=>{
  const customer  = await Customer.findOne({
      where:{ 
        mobilePhone:payload.mobilePhone
      }
  })

  if(customer){
      throw new AppError("Customer already exits", 409, true)
  }

  const newCustomer  = Customer.create(payload)
  return newCustomer.save()
}


const getCustomer = async (balance: number) => {
  const customer = await Customer.findOne({ where: { balance: balance } });

  if (!customer) {
    throw new AppError("Customer not found", 404, true);
  }

  return customer;
};


const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.find();
  res.json({
    message: "Getting all customers successfully",
    status: true,
    customers: customers
  });
};


const deleteCustomer = async (name:string)=>{
  const customer = await Customer.findOne({ where:{name:name }})

  if(!customer){
      throw new AppError("customer not found ", 404, true)
  }

  return customer.remove()
}


const editCustomer = async (name:string, payload:Customer)=>{
  const customer = await Customer.findOne({ where:{name:name }})

  if(!customer){
      throw new AppError("customer not found ", 404, true)
  }

  if(payload.name){
    customer.name = payload.name
  }

  if(payload.balance){
    customer.balance = payload.balance
  }

  return customer.save()
  
}

export { createCustomer, getCustomer, getAllCustomers, deleteCustomer, editCustomer };