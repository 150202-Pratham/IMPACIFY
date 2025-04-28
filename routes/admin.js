const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

router.get('/revenue', async (req, res) => {
    try {
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        res.json({ totalRevenue });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/menu', async (req, res) => {
    const items = await MenuItem.find();
    res.json(items);
});

router.post('/menu', async (req, res) => {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
});

router.put('/menu/:id', async (req, res) => {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete('/menu/:id', async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

module.exports = router;
