const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const MacValidation = require('../middlewares/MacValidation');

router.get('/filter/all/:macadress', TaskController.list);

router.get('/:id', TaskController.listOne);

router.get('/filter/late/:macadress', TaskController.listOverTasks);
router.get('/filter/today/:macadress', TaskController.listTodayTasks);
router.get('/filter/week/:macadress', TaskController.listWeeklyTasks);
router.get('/filter/month/:macadress', TaskController.listMonthTasks);
router.get('/filter/year/:macadress', TaskController.listYearTasks);

router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);

router.put('/:id/:done', TaskController.doneTask);

router.delete('/:id', TaskController.delete);





module.exports = router;