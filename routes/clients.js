const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");
const {
  clientsGet,
  clientsPost,
  clientsPut,
  clientsDelete,
} = require("../controllers/clients");

const {
  emailClientsExisteix,
  emailClientsNoExisteix,
} = require("../helpers/db-validators");

const router = Router();

const validarCamps = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/clients", clientsGet);

router.post(
  "/clients",
  [
    check("correu", "El correu no és vàlid").isEmail(),
    check("correu").custom(emailClientsExisteix),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),

    validarCamps,
  ],
  clientsPost
);

router.put(
  "/clients",
  [
    check("correuSearch", "El correu a buscar és obligatori").not().isEmpty(),
    check("correuSearch").custom(emailClientsNoExisteix),
    check("correu", "El nou correu no és vàlid").isEmail(),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),
  ],
  clientsPut
);

router.delete("/clients", [
  check("correuSearch", "El correu a buscar és obligatori").not().isEmpty(),
  check("correuSearch").custom(emailClientsNoExisteix),
  clientsDelete,
]);

module.exports = router;
