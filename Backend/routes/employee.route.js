const express = require('express');
const employeeRoute = express.Router();
const Employee = require('../models/Employee');

// Add Employee
employeeRoute.route('/create').post(async (req, res, next) => {
  try {
    const data = await Employee.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get All Employees
employeeRoute.route('/').get(async (req, res, next) => {
  try {
    const data = await Employee.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get Single Employee
employeeRoute.route('/read/:id').get(async (req, res, next) => {
  try {
    const data = await Employee.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Update Employee
employeeRoute.route('/update/:id').put(async (req, res, next) => {
  try {
    const data = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!data) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(data);
    console.log('Data updated successfully');
  } catch (error) {
    next(error);
  }
});

// Delete Employee
employeeRoute.route('/delete/:id').delete(async (req, res, next) => {
  try {
    const data = await Employee.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ msg: 'Employee deleted successfully', deletedEmployee: data });
  } catch (error) {
    next(error);
  }
});

module.exports = employeeRoute;
