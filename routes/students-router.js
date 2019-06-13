const express = require("express");
const router = express.Router();
const studentsDB = require('../data/students-model');

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


router.post('/', async (req, res) => {
    try {
        const newStudent = await studentsDB.add(req.body);

        res.status(201).json(newStudent);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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