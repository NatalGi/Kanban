import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Get all notes
router.route('/notes').get(NoteController.getNotes);

// Add a new note
router.route('/notes').post(NoteController.addNote);

// Delete a note by noteId
router.route('/notes/:noteId').delete(NoteController.deleteNote);

// Update note's task
router.route('/notes').put(NoteController.updateNote);

export default router;
