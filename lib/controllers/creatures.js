const { Router } = require('express');
const Creature = require('../models/Creature');


module.exports = Router()
  .post('/', async (req, res) => {
    const creature = await Creature.insert(req.body);
    res.json(creature);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const creature = await Creature.getById(id);
    res.json(creature);
  })

  .get('/', async (req, res) => {
    const creature = await Creature.getAll();
    res.json(creature);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, species, lifespan, environment, img_url } = req.body;
   
    try {
      const creature = await Creature.updateById(id, { title, species, lifespan, environment, img_url });
      res.json(creature);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const creature = await Creature.deleteById(req.params.id);
      res.json(creature);
    } catch(err) {
      res(err);
    }
  });
