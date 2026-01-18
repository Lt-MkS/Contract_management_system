const validateBlueprint = (req, res, next) => {
  const { name, description, terms } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Blueprint name is required' });
  }
  
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Blueprint description is required' });
  }
  
  if (!terms || !Array.isArray(terms)) {
    return res.status(400).json({ error: 'Blueprint terms must be an array' });
  }
  
  next();
};

const validateContract = (req, res, next) => {
  const { blueprintId, title, status } = req.body;
  
  if (!blueprintId) {
    return res.status(400).json({ error: 'Blueprint ID is required' });
  }
  
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Contract title is required' });
  }
  
  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'Contract status is required' });
  }
  
  next();
};

module.exports = { validateBlueprint, validateContract };
