const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Servei = require("../models/serveis");

const serveisGet = async (req = request, res = response) => {
  const serveis = await Servei.find();
  res.json({
    serveis,
  });
};

module.exports = {
  serveisGet,
};
