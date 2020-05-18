const sql = require("../model/db")

const Deal = function(deal) {
    this.text = deal.text;
    this.inner_key = deal.inner_key;
};

Deal.create = (newDeal, result) => {
    sql.query("INSERT INTO TODO SET ?", newDeal, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Дело сделано", { id: res.insertId, ...newDeal });
        result(null, { id: res.insertId, ...newDeal });
    });
};

Deal.findById = (dealId, result) => {
    sql.query(`SELECT * FROM TODO WHERE inner_key = '${dealId}'`, (err, res) => {
  
      // здесь обработка ошибок, не вижу смысла ее дублировать
  
      if (res.length) {
        console.log("найдено дело: ", res[0]);
        result(null, res[0]);
        return;
      }
      // если вдруг не удалось найти
      result({ kind: "not_found" }, null);
    });
  };



Deal.getAll = result => {
    // throw console.log(sql)
    sql.query("SELECT * FROM todo", (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            
            return;
        }

        console.log("deals: ", res);
        result(null, res);
    });
};

// console.log("GET", Deal.getAll());

Deal.updateById = (id, deal, result) => {
    const queryUpdate = "UPDATE TODO SET text =? WHERE inner_key = ?"
    sql.query(
        queryUpdate,
        [deal.text, id],
        (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Обновлено дело", { id: id, ...deal });
        result(null, { id: id, ...deal });
    });
};

Deal.remove = (id, result) => {
    const queryDelete = "DELETE FROM TODO WHERE inner_key = ?"
    sql.query(queryDelete, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // если дело не удалось получить по id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Удален пользователь с ", id);
        result(null, res);
    });
};

Deal.removeAll = result => {
    sql.query("DELETE FROM TODO", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} deals`);
        result(null, res);
    });
};
    