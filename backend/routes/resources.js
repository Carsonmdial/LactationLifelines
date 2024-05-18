const express = require('express');
const router = express.Router();
const { addResource, getResources, updateResource, deleteResource } = require('../controllers/resources');
const auth = require('../middleware/auth');

router.post('/add', auth, addResource);
router.get('/', getResources);
router.put('/update/:id', auth, updateResource);
router.delete('/delete/:id', auth, deleteResource);

module.exports = router;
