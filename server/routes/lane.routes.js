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

export default router;
