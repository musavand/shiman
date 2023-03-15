const express = require("express");
const { upCommingSession, allSession, getSessionData, joinSession,   disJoinSession, } = require("../controllers/studentController");
const router = express.Router();
router.get("/allSession", allSession);
router.get("/upCommingSession", upCommingSession);
router.get("/getSessionData", getSessionData);

router.post("/joinSession", joinSession);
router.post("/disJoinSession", disJoinSession);
module.exports = router;