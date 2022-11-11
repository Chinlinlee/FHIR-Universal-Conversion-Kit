module.exports.profile = {
    name: 'patient',
    version: '1.0.0',
    fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',
    action: 'return', // return, upload
    doValidation: true
}

module.exports.globalResource = {
    Patient: {
        managingOrganization: {
            reference: '#Organization'
        },
        meta: {
            profile: [
                "https://twcore.mohw.gov.tw/fhir/StructureDefinition/Patient-twcore"
            ]
        }
    }
}

module.exports.fields = [
    {
        source: 'id',
        target: 'Patient.id',
    },
    {
        source: 'identifier',
        target: 'Patient.identifier',
        beforeConvert: (data) => {
            return {
                use: 'official',
                system: 'https://www.vghtc.gov.tw/',
                value: data,
            }
        }
    },
    {
        source: 'name',
        target: 'Patient.name',
        beforeConvert: (data) => {
            return {
                use: 'official',
                text: data,
            }
        }
    },
    {
        source: 'identifier2',
        target: 'Patient.identifier',
        beforeConvert: (data) => {
            return {
                use: 'official',
                system: 'https://www.vghtc.gov.tw/',
                value: data,
            }
        }
    },
    {
        source: 'gender',
        target: 'Patient.gender',
        beforeConvert: (data) => {
            console.log(data);
            return data;
        }
    }
]