const { response } = require('express');
const TaskModel = require('../model/TaskModel');

class TaskController {
    async create(req, res) {
        const task = new TaskModel(req.body);
        await task
                .save()
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(err => {
                    return res.status(500).json(err);
                });
    }

    async update(req, res) {
        const { id } = req.params

        await TaskModel.findByIdAndUpdate({ '_id': id }, req.body, {new: true})
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
    }

    async list(req, res) {
        await TaskModel.find().then(response => {
            return res.json(response);
        });
    }

}

module.exports = new TaskController();