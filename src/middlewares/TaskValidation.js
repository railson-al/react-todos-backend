const { isPast } = require('date-fns');

const TaskModel  = require('../model/TaskModel');



const TaskValidation = async (req, res, next) => {

    const { macadress, type, title, description, when } = req.body;

    if (!macadress) {
        return res.status(400).json({error: "macadress is required!"});
    } else if (!type) {
        return res.status(400).json({error: "type is required!"});
    } else if (!title) {
        return res.status(400).json({error: "title is required!"});
    } else if (!description) {
        return res.status(400).json({error: "description is required!"});
    } else if (!when) {
        return res.status(400).json({error: "date is required!"});

    } else if (isPast(new Date(when))) {
        return res.status(400).json({error: "date isn't past!"});
    } else {

        const { id } = req.params;
        let taskExist;

        if (id){
            
            taskExist = await TaskModel.findOne({ '_id': {'$ne': id} ,'when': { '$eq': new Date(when) }, 'macadress': { $in: macadress } });
        
        } else {
            
            taskExist = await TaskModel.findOne({ 'when': { '$eq': new Date(when) }, 'macadress': { $in: macadress } });
        }
        
        
        
        if (taskExist) {
            return res.status(400).json({ error: 'Task in this Date/Hour already exists!' });
            
        }

        next();
    }

    
}

module.exports = TaskValidation;