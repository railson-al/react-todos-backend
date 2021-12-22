
const MacValidation = async (req, res, next) => {
    
    const { macadress } = req.body;

    if(!macadress) {
        return res.status(400).json({ error: 'macadress not informed!' });
    } 
    
    next();

};

module.exports = MacValidation;