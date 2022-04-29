const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const exphbs = require("express-handlebars");
const configRoutes = require("./routes");

const templatePath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.use(express.urlencoded({ extended: false }));

app.set("views", templatePath);
app.engine("handlebars", exphbs.create({ defaultLayout: "index" }).engine);
app.set("view engine", "handlebars");
app.use("/public", express.static(__dirname + "/public"));
hbs.registerPartials(partialsPath);

configRoutes(app);
app.listen(3000, () => {
  console.log(
    "Resume Builder server started!\nNavigate to localhost:3000 to access the application"
  );
});
