const db = require("../models/piHome/index");

module.exports = {
  list(req, res) {
    return db.Recipe.findAll()
      .then(recipes => res.status(200).send(recipes))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return db.Recipe.findByPk(req.params.id)
      .then(recipes => {
        if (!recipes) {
          return res.status(404).send({
            message: "Address Not Found"
          });
        }
        return res.status(200).send(recipes);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body);
    return db.Recipe.create({
      name: req.body.name,
      address: req.body.addressLine1,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      qbId: req.body.qbId
    })
      .then(recipe => res.status(201).send(recipe))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return db.Recipe.findByPk(req.params.id)
      .then(recipe => {
        if (!recipes) {
          return res.status(404).send({
            message: "Recipe Not Found"
          });
        }
        return recipe
          .update({
            Recipe: req.body.CustomerName
          })
          .then(() => res.status(200).send(recipe))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    console.log(req.params);

    return db.Recipe.findByPk(req.params.id)
      .then(recipe => {
        console.log(recipe);
        if (!recipe) {
          return res.status(400).send({
            message: "Recipe Not Found"
          });
        }
        return recipe
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
