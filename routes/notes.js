const express = require('express');
const {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
} = require('../controllers/noteController')

const fetchUser = require('../middleware/fetchUser')

const router = express.Router();

// Get All Notes: GET "api/notes/" Login Required
router.get('/', fetchUser, getNotes)
// Get a Single Note: GET "api/notes/:id" Login Required
router.get('/:id', fetchUser, getNote)
// Add a Note: POST "api/notes/" Login Required
router.post('/', fetchUser, createNote)
// Update a Note: PATCH "api/notes/:id" Login Required
router.patch('/:id', fetchUser, updateNote)
// Delete a Note: PATCH "api/notes/:id" Login Required
router.delete('/:id', fetchUser, deleteNote)

module.exports = router;