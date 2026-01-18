const express = require('express');
const Blueprint = require('../models/Blueprint');
const { validateBlueprint } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateBlueprint, async (req, res, next) => {
  try {
    const { name, description, terms } = req.body;
    const blueprint = await Blueprint.create(name, description, terms);
    res.status(201).json(blueprint);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const blueprints = await Blueprint.getAll();
    res.json(blueprints);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const blueprint = await Blueprint.getById(req.params.id);
    if (!blueprint) {
      return res.status(404).json({ error: 'Blueprint not found' });
    }
    res.json(blueprint);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateBlueprint, async (req, res, next) => {
  try {
    const { name, description, terms } = req.body;
    const blueprint = await Blueprint.update(req.params.id, name, description, terms);
    res.json(blueprint);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Blueprint.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;