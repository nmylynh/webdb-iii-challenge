const express = require("express");
const router = express.Router();
const studentsDB = require('../data/students-model');
const cohortsDB = require('../data/cohorts-model');

//middleware
const validateSCID = async (req, res, next) => {
    try {
    const {cohort_id} = req.body;
    const validID = await cohortsDB.findById(cohort_id);

    validID 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing cohort id"});
    }
}

const validateStudentID = async (req, res, next) => {
    try {
    const {id} = req.params;
    const student = await studentsDB.findById(id);

    student 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing student id"});
    }
}

const validateStudentBody = (req, res, next) => {
    const {cohort_id, name} = req.body;

    cohort_id
    ? name
    ? next()
    : res.status(400).json({message: "missing name field"})
    : res.status(400).json({message: "missing cohort id"});
} 


//endpoints

router.get('/', async (req, res) => {
    try {
        const students = await studentsDB.find();

        res.status(200).json(students);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const student = await studentsDB.findById(id);

        res.status(200).json(student);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 


router.post('/', validateStudentBody, validateSCID, async (req, res) => {
    try {
        const newStudent = await studentsDB.add(req.body);

        res.status(201).json(newStudent);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', validateStudentBody, validateStudentID, validateSCID, async (req, res) => {
    try {
        const {id} = req.params;
        const updateStudent = await studentsDB.update(id, req.body);

        updateStudent
        ? res.status(200).json({message: "successfully updated student"})
        : res.status(404).json({message: "student not found"});
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', validateStudentID, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await studentsDB.remove(id);

        success 
        ? res.status(204).end()
        : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});


module.exports = router;