const express = require('express');

const controller = require('./src/controller/simple_crud_controller');
const app  = express();

app.use("/create", controller.create);
app.use("/read", controller.read);
app.use("/update", controller.update);
app.use("/delete", controller.delete);

app.listen(3000, () => {
  console.log("Server started");
});