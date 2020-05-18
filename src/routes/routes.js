const {Router} = require("express")
const router = Router()
const deals = require("../controllers/deal.controller")
const sql = require("../model/db")


router.get("/", async (req, res) => {
    res.render("home", {
        title: "Home"
    })
})

// router.post("/deals", deals.create)
// router.get("/deals", deals.findAll)
// router.get("/deal/:dealId", deals.findOne)
// router.put("/deal/:dealId", deals.update)
// router.delete("/deal/:dealId", deals.delete)
// router.delete("/deals", deals.deleteAll)

router.get("/users", async (req, res) => {
    await sql.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.log("DEN ERROR", err)
        }
        res.send(results)
    })
})

router.get("/user/:id", async (req, res) => {
    await sql.query(`SELECT * FROM users where id='${req.params.id}'`, (err, results) => {
        if (err) {
            console.log("DEN ERROR", err)
        }

         res.send(results)
    })
})

router.post("/users", async (req, res) => {
    await sql.query(`INSERT INTO users (id, name, surname, age) VALUES (NULL, '${req.body.name}', '${req.body.surname}', '${req.body.age}')`, req.body, (err, results) => {
        if (err) {
            console.log("DEN ERROR", err)
        }

    })
})

module.exports = router