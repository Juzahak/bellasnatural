import { executeQuery } from "../../config/db";

const getAllCustomers = async (req, res) => {
  try {
    let employeeData = await executeQuery("select * from customers ORDER BY `name`", []);
    res.send(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveCustomers = async (req, res) => {
  const result = req.body;
  const { name, color } = result;
  try {
    console.log("post request");
    let CategoriesData = await executeQuery(
      "insert into customers (name, color) values(?,?)",
      [name, color]
    );
    CategoriesData = await executeQuery(
      `select * from customers where id=${CategoriesData.insertId}`
    );
    res.status(201).json(CategoriesData);
  } catch (err) {
    res.status(400).json(err);
  }};

  const deleteCustomersById = async (req, res, next) => {
    let id = req.query.id;
    try {
      let CategoriesData = await executeQuery(
        "delete from customers where id=?",
        [id]
      );
      res.status(200).json("customers Deleted Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const updateCustomers = async (req, res) => {
    let id = req.query.id;

    const { name, color, id_ } = req.body;

    try {
      let customers = await executeQuery(
        "select * from customers where id=?",
        [id]
      );
      if (customers.length > 0) {
        customers = await executeQuery(
          `update customers set name=?,color=? where id=${id}`,
          [name, color]
        );
        res.status(200).json(customers);
      } else {
        res.status(400).json(`customers not found on this id=${id}`);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };

  const getCustomersById = async (req, res, next) => {
    let id = req.query.id;
    try {
      console.log("categories by id");
      let categoriesData = await executeQuery(
        `select * from customers where id=${id}`,
        []
      );
      if (categoriesData.length > 0) res.status(200).json(categoriesData);
      else {
        next(new ErrorHandler(`no customers found with this id ${id}`, 404));
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  export {
    getAllCustomers,
    updateCustomers,
    getCustomersById,
    saveCustomers,
    deleteCustomersById,
  };
