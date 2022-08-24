const Note = require('../models/Notes')
const mongoose = require('mongoose')

// Get All Notes
const getNotes = async(req, res) => {
    try {
        const notes = await Note.find({user: req.user.id}).sort({date: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

// Get Single Note
const getNote = async(req, res) => {
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No Such Note Found'}) //Not Valid Id Type
        }
        const note = await Note.findOne({_id: id, user: req.user.id})
        if(!note) {
            return res.status(404).json({error: 'No Such Note Found'})
        }
        res.status(200).json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

// Create a Note
const createNote = async(req, res) => {
    const {title, description, tag} = req.body

    const emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Title and Description not shoud be empty', emptyFields })
    }

    // add doc to db
    try{
        const note = await Note.create({title, description, tag, user: req.user.id})
        res.status(200).json(note)
    }catch(error){
        console.error(error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

// Delete a note
const deleteNote = async (req, res) => {
    const {id} = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No Such Note Found'}) //Not Valid Id Type
        }
        const note = await Note.findOneAndDelete({_id: id, user: req.user.id})
        if(!note){
            return res.status(404).json({error: 'No Such Note Found'})
        }
        res.status(200).json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

// Update a Note
const updateNote = async (req, res) => {
    const {id} = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No Such Note Found'}) ////Not Valid Id Type
        }
        const note = await Note.findOneAndUpdate({_id: id, user: req.user.id}, {
            ...req.body
        }) //If User Enter Only One Filed Than That Only Will Updated
        if(!note){
            return res.status(404).json({error: 'No Such Note Found'})
        }
        res.status(200).json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
}