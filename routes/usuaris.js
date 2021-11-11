const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");

const {
  usuarisGet,
  usuarisPost,
  usuarisPut,
  usuarisDelete,
} = require("../controllers/usuaris");

const {
  emailUsuariExisteix,
  emailUsuariNoExisteix,
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

router.get("/usuaris", usuarisGet);

router.post(
  "/usuaris",
  [
    check("correu", "El correu no és vàlid").isEmail(),
    check("correu").custom(emailUsuariExisteix),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),

    validarCamps,
  ],
  usuarisPost
);

router.put(
  "/usuaris",
  [
    check("correuSearch", "El correu a buscar és obligatori").not().isEmpty(),
    check("correuSearch").custom(emailUsuariNoExisteix),
    check("correu", "El nou correu no és vàlid").isEmail(),
    check("nom", "El nom és obligatori").not().isEmpty(),
    check("password", "El password ha de tenir més de 6 caràcters").isLength({
      min: 6,
    }),
  ],
  usuarisPut
);

router.delete("/usuaris", [
  check("correuSearch", "El correu a buscar és obligatori").not().isEmpty(),
  check("correuSearch").custom(emailUsuariNoExisteix),
  usuarisDelete,
]);

// router.put /:id //update d'un determinat usuari
// router.delete /:id //eliminar un usuari determinat

module.exports = router;
