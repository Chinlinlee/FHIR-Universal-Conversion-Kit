/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
   exits: {
    success: {
      responseType: 'ok'
    },
    err: {
      responseType: 'err'
    }
  },
  cacheProfile: false,
  javaFhirValidator: {
    enable: true,
    preLoadIGs: [
      {
        name: "hl7.fhir.uv.ips",
        version: "1.0.0"
      }
    ]
  }
};
