import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

//Get all lanes
router.route('/lanes').get(LaneController.getLanes);

// Add a new lane
router.route('/lanes').post(LaneController.addLane);

// Delete a lane by laneId
router.route('/lane/:laneId').delete(LaneController.deleteLane);

// Update lane's name
router.route('/lanes').put(LaneController.updateLane);

// Moves notes whithin lane
router.route('/lane/notes').put(LaneController.moveNotesWithinLane);

// Move note between lanes
router.route('/lanes/note').put(LaneController.moveNoteBetweenLanes);

export default router;
