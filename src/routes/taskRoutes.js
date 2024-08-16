const express = require('express');
const router = express.Router();
const {createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', createTask);
router.get('/get', getTasks);
router.put('/update/:id', roleMiddleware('Admin'), updateTask);
router.delete('/delete/:id', roleMiddleware('Admin'),deleteTask);

module.exports = router;
