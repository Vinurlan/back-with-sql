const express = require("express")
const exphbs = require("express-handlebars")
const router = require("./src/routes/routes")
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 3001

const app = express()
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
}) 

app.engine("hbs", hbs.engine)
app.set('view engine', 'hbs')
app.set("views", "./src/views")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    next()
})

app.use(router)

app.listen(PORT, () => {
    console.log("Server start...")
})