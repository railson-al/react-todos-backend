const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns');
const TaskModel = require('../model/TaskModel');



const currentDate = new Date();


class TaskController {


    async create(req, res) { //Cria uma nova task
        const task = new TaskModel(req.body);
        await task
                .save()
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(err => {
                    return res.status(500).json(err);
                });
    };

    async update(req, res) { //alteras as caracteristicas da Task
        const { id } = req.params

        await TaskModel.findByIdAndUpdate({ '_id': id }, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
    };

    async list(req, res) { //lista todas as tarefas do dispositivo
        
        await TaskModel.find({ macadress: {'$in': req.params.macadress} })
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response);
                        })
                        .catch(error => {
                            return res.status(500).json(error)
                        });
    };
    
    async listOne(req, res) { //Listando detalhes de uma task
        const { id } = req.params;
        
        if(id) {
            await TaskModel.findById(id)
                            .then(response => {
                                if(!response) {
                                    return res.status(404).json({ error: 'Task not found!' });
                                }

                                return res.status(200).json(response);
                            });
        };
    };

    async delete(req, res) {
        const { id } = req.params;

        const Task = await TaskModel.findById(id);


        await TaskModel.deleteOne({ '_id': id })
        .then(response => {
            return res.status(200).json({message: `Task ${Task.description} has removed!`});
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    };

    async doneTask(req, res) {
        const { id, done } = req.params;

        await TaskModel.findByIdAndUpdate(
            { '_id': id },
            { 'done': done },
            { new: true }
            ).then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    };

    async listOverTasks(req, res) {
        const { macadress } = req.params;

        await TaskModel.find({'when': {'$lt': currentDate}, 'macadress': {'$in': macadress}})
                        .sort('when')
                        .then(response => {
                            return res.status(200).json(response);
                        })
                        .catch(error => {
                            return res.status(500).json(error);
                        });
    };

    async listTodayTasks(req, res) {
        const {macadress} = req.params;

        await TaskModel
                .find({ 'macadress': {'$in': macadress},
                        'when': {'$gte': startOfDay(currentDate), '$lte': endOfDay(currentDate)} })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    };

    async listWeeklyTasks(req, res) {
        const {macadress} = req.params;

        await TaskModel
                .find({ 'macadress': {'$in': macadress},
                        'when': {'$gte': startOfWeek(currentDate), '$lte': endOfWeek(currentDate)} })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    };

    async listMonthTasks(req, res) {
        const {macadress} = req.params;

        await TaskModel
                .find({ 'macadress': {'$in': macadress},
                        'when': {'$gte': startOfMonth(currentDate), '$lte': endOfMonth(currentDate)} })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    };

    async listYearTasks(req, res) {
        const {macadress} = req.params;

        await TaskModel
                .find({ 'macadress': {'$in': macadress},
                        'when': {'$gte': startOfYear(currentDate), '$lte': endOfYear(currentDate)} })
                .sort('when')
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    };

};

module.exports = new TaskController();