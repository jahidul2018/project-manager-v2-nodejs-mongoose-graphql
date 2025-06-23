const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');

// Protected route for admins only
router.post(
    '/admin-only-endpoint',
    authMiddleware,
    roleMiddleware('admin'),
    (req, res) => {
        res.json({ message: 'Admin access granted' });
    }
);

// Route for admins and employees
router.get(
    '/shared-endpoint',
    authMiddleware,
    roleMiddleware('admin', 'employee'),
    (req, res) => {
        res.json({ message: `Hello ${req.user.name}, you have access.` });
    }
);
// Public route accessible to everyone
router.get('/public-endpoint', (req, res) => {
    res.json({ message: 'This is a public endpoint accessible to everyone.' });
});

module.exports = router;
