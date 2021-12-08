const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.get('/', TaskController.list);

router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);




module.exports = router;