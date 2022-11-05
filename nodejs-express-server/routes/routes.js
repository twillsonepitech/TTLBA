const express = require('express');
const Model = require('../models/model');
const router = express.Router()
module.exports = router;

//Post Method
router.post('/create', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.warranty_years,
        available: req.body.available,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
})

//Update by ID Method
router.put('/update', async (req, res) => {
    console.log(req.body.updateData);
    try {
        const names = req.body.names;
        const updatedData = req.body.updateData;
        const options = { new: true };
        var ids = [];

        try {
            const datas = await Model.find();
            names.forEach(function (name) {
                datas.forEach(function (data) {
                    if (name == data.name)
                        ids.push(data._id);
                })
            });
        } catch(error) {
            res.status(500).json({message: error.message});
        }
        ids.forEach(async function (id) {
            await Model.findByIdAndUpdate(
                id, updatedData, options
            );
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Delete by ID Method
router.delete('/delete', async (req, res) => {
    try {
        const names = req.body.names;
        var ids = [];
        try {
            const datas = await Model.find();
            res.json(datas);
            names.forEach(function (name) {
                datas.forEach(function (data) {
                    if (name == data.name)
                        ids.push(data._id);
                })
            });
        } catch(error) {
            res.status(500).json({message: error.message});
        }
        ids.forEach(async function (id) {
            const data = await Model.findByIdAndDelete(id);
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
