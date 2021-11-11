const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Client = require("../models/clients");

const clientsGet = async (req = request, res = response) => {
  const clients = await Client.find();
  res.json({
    clients,
  });
};

const clientsPost = async (req, res = response) => {
  let { nom, companyia, correu, estat, telefon, partner, adreca, password } =
    req.body;

  const client = new Client({
    nom,
    companyia,
    correu,
    estat,
    telefon,
    partner,
    adreca,
    password,
  });

  // Encriptar passwd
  const salt = bcryptjs.genSaltSync();
  client.password = bcryptjs.hashSync(password, salt);

  await client.save();

  res.json({
    client,
  });
};

const clientsPut = async (req, res = response) => {
  let { nom, companyia, correu, estat, telefon, partner, adreca, password } =
    req.body;

  const clientTrobat = await Client.updateOne(
    {
      correu,
    },
    {
      $set: {
        nom,
        companyia,
        correu,
        estat,
        telefon,
        partner,
        adreca,
        password,
      },
    }
  );

  if (clientTrobat.matchedCount != 0) {
    // Encriptar passwd
    const salt = bcryptjs.genSaltSync();
    clientTrobat.password = bcryptjs.hashSync(password, salt);

    res.json({
      clientTrobat,
    });
  } else {
    res.json({
      modificar: false,
      msg: "El client no s'ha pogut modificar",
    });
  }
};

const clientsDelete = async (req, res = response) => {
  let { correu } = req.body;

  const client = await Client.deleteOne({
    correu,
  });

  if (client.matchedCount != 0) {
    res.json({
      eliminat: true,
      msg: "Client eliminat amb exit!",
    });
  } else {
    res.json({
      eliminat: false,
      msg: "Client no s'ha pogut eliminar",
    });
  }
};

module.exports = {
  clientsGet,
  clientsPost,
  clientsPut,
  clientsDelete,
};
