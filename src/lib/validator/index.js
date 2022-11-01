const path = require("path");
const validator = require("node-java-fhir-validator")(
    path.normalize(
        path.join(__dirname, "./igs")
    )
);

module.exports = validator;