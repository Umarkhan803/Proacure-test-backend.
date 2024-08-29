const express = require("express");
const app = express();

require("./Config/Config");
const cors = require("cors");
const products = require("./Products.json");
const Products = require("./Models/products");
const port = 3500;

app.use(cors());
app.use(express.json());

// Products API
app.get("/api/products", (req, res) => {
  return res.json(products);
});

// Search API
app.get("/api/search", (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  const results = products.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
  res.json(results);
});

//Add Product API
app.post("/api/require", async (req, res) => {
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);
});

app.listen(port, () => console.log(`port started at PORT ${port}!`));
