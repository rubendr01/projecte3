const { Schema, model } = require("mongoose");

const ClientSchema = Schema({
  nom: {
    type: String,
    required: [true, "El nom és obligatori"],
  },
  companyia: {
    type: String,
    required: [true, "La companyia es obligatoria"],
  },
  correu: {
    type: String,
    required: [true, "El correu es obligatori"],
    unique: true,
  },
  estat: {
    type: Boolean,
    default: true,
  },
  telefon: {
    type: String,
    required: [true, "El telefon es obligatori"],
  },
  partner: {
    type: Boolean,
    default: false,
  },
  adreca: {
    type: String,
    required: [true, "La adreça es obligatoria"],
  },
  password: {
    type: String,
    required: [true, "La contrasenya és obligatoria"],
  },
});

ClientSchema.methods.toJSON = function () {
  const { __v, password, ...client } = this.toObject();
  return client;
};

module.exports = model("Client", ClientSchema);
