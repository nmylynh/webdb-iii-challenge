const express = require("express");
const router = express.Router();
const cohortsDB = require('../data/cohorts-model');

//middleware

const validateCohortID = async (req, res, next) => {
    try {
    const {id} = req.params;
    const cohort = await cohortsDB.findById(id);

    cohort 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing cohort id"});
    }
}

const validateCohortBody = (req, res, next) => {
    const { name } = req.body;

    name 
    ? next() 
    : res.status(400).json({message: "missing required name field"});
};

//endpoints

router.get('/', async (req, res) => {
    try {
        const cohorts = await cohortsDB.find();

        res.status(200).json(cohorts);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const cohort = await cohortsDB.findById(id);

        res.status(200).json(cohort);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 


router.post('/', validateCohortBody, async (req, res) => {
    try {
        const newCohort = await cohortsDB.add(req.body);

        res.status(201).json(newCohort);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', validateCohortBody, validateCohortID, async (req, res) => {
    try {
        const {id} = req.params;
        const updateCohort = await cohortsDB.update(id, req.body);

        updateCohort
        ? res.status(200).json({message: "successfully updated cohort"})
        : res.status(404).json({message: "cohort not found"});
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', validateCohortID, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await cohortsDB.remove(id);

        success 
        ? res.status(204).end()
        : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});





module.exports = router;