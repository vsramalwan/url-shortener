import express from "express";
const { urlController, statsController } = require("../controllers");
const router = express.Router();

router.post("/url", urlController.generateShortLink);
router.get("/url/:shortUrl", urlController.visitShortLink);
router.get("/stats/:shortUrl", statsController.getStats);

module.exports = router;
