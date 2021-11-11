const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuari = require("../models/usuari");

const usuarisGet = async (req = request, res = response) => {
  const usuaris = await Usuari.find();
  res.json({
    usuaris,
  });
};

const usuarisPost = async (req, res = response) => {
  let { nom, estat, correu, password, rol, google } = req.body;
  if (correu.includes("@gmail")) {
    google = true;
  }
  const usuari = new Usuari({
    nom,
    estat,
    correu,
    password,
    rol,
    google,
  });

  // Encriptar passwd
  const salt = bcryptjs.genSaltSync();
  usuari.password = bcryptjs.hashSync(password, salt);

  await usuari.save();

  res.json({
    usuari,
  });
};

const usuarisPut = async (req, res = response) => {
  let { nom, estat, correu, password, rol, google } = req.body;
  if (correu.includes("@gmail")) {
    google = true;
  }

  const usuariTrobat = await Usuari.updateOne(
    {
      correu,
    },
    {
      $set: {
        nom,
        estat,
        correu,
        password,
        rol,
        google,
      },
    }
  );

  if (usuariTrobat.matchedCount != 0) {
    // Encriptar passwd
    const salt = bcryptjs.genSaltSync();
    usuariTrobat.password = bcryptjs.hashSync(password, salt);

    res.json({
      usuariTrobat,
    });
  } else {
    res.json({
      modificar: false,
      msg: "L'usuari no s'ha pogut modificar",
    });
  }
};

const usuarisDelete = async (req, res = response) => {
  let { correu } = req.body;

  const usuari = await Usuari.deleteOne({
    correu,
  });

  if (usuari.deletedCount != 0) {
    res.json({
      eliminat: true,
      msg: "Usuari eliminat amb exit!",
    });
  } else {
    res.json({
      eliminat: false,
      msg: "L'usuari no s'ha pogut eliminar",
    });
  }
};

module.exports = {
  usuarisGet,
  usuarisPost,
  usuarisPut,
  usuarisDelete,
};
