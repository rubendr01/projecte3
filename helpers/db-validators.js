const clients = require("../models/clients");
const Usuari = require("../models/usuari");

const emailUsuariExisteix = async (correu = "") => {
  // Verificar si el correu ja existeix a la db
  const existeix = await Usuari.findOne({ correu });
  if (existeix) {
    throw new Error(`El correu ${correu} ja està registrat`);
  }
};

const emailUsuariNoExisteix = async (correu = "") => {
  const emailNoExisteix = await Usuari.findOne({ correu });
  if (!existeix) {
    throw new Error(`El correu ${correu} no està registrat`);
  }
};

const emailClientsExisteix = async (correu = "") => {
  // Verificar si el correu ja existeix a la db
  const existeix = await clients.findOne({ correu });
  if (existeix) {
    throw new Error(`El correu ${correu} ja està registrat`);
  }
};

const emailClientsNoExisteix = async (correu = "") => {
  const emailNoExisteix = await clients.findOne({ correu });
  if (!existeix) {
    throw new Error(`El correu ${correu} no està registrat`);
  }
};

module.exports = {
  emailUsuariExisteix,
  emailUsuariNoExisteix,
  emailClientsExisteix,
  emailClientsNoExisteix,
};
