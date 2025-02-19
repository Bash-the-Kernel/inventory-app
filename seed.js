const { createCategory, createItem } = require('./models');

(async () => {
  const electronics = await createCategory('Electronics', 'Gadgets and devices');
  await createItem('Laptop', 'High-performance laptop', 999.99, 10, electronics.id);
})();