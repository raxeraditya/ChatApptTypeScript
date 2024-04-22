import express, { Request, Response, NextFunction } from "express";

const isAuthencticate = (req: Request, next: NextFunction) => {
  const token = req.cookies.jwt;
  console.log("getToken", token);
  next();
};

export default isAuthencticate;
