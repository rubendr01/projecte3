const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");
const { serveisGet } = require("../controllers/serveis");

const router = Router();

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/serveis", serveisGet);

module.exports = router;
