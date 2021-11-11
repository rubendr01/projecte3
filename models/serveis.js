const { Schema, model } = require("mongoose");

const ServeiSchema = Schema({
  nom: {
    type: String,
    required: [true, "El nom és obligatori"],
  },
  descripcio: {
    type: String,
    required: [true, "La descripció es obligatoria"],
  },
  feta: {
    type: Boolean,
    default: false,
  },
  usuariCreacio: {
    type: String,
    required: [true, "El usuari que l'ha creat s'ha d'especificar"],
  },
  dataInici: {
    type: String,
    required: [true, "S'ha d'especificar la data d'inici"],
  },
});

ServeiSchema.methods.toJSON = function () {
  const { __v, password, ...servei } = this.toObject();
  return servei;
};

module.exports = model("Servei", ServeiSchema);
