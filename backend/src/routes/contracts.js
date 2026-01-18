const express = require('express');
const Contract = require('../models/Contract');
const { validateContract } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateContract, async (req, res, next) => {
  try {
    const { blueprintId, title, status } = req.body;
    const contract = await Contract.create(blueprintId, title, status);
    res.status(201).json(contract);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const contracts = await Contract.getAll();
    res.json(contracts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contract = await Contract.getById(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const contract = await Contract.updateStatus(req.params.id, status);
    res.json(contract);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Contract.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
