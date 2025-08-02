const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
router.post('/register', register);
router.post('/login', login);
module.exports = router;

// backend/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/sessionController');
router.get('/sessions', ctrl.getPublicSessions);
router.use(auth);
router.get('/my-sessions', ctrl.getUserSessions);
router.get('/my-sessions/:id', ctrl.getSessionById);
router.post('/my-sessions/save-draft', ctrl.saveDraft);
router.post('/my-sessions/publish', ctrl.publishSession);
module.exports = router;