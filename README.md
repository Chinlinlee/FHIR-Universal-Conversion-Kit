# FHIR Universal Conversion Kit (Project F.U.C.K)

FHIR Universal Conversion Kit (F.U.C.K.) is a super awesome and sexy kit that can convert albitary data to HL7 FHIR data. 

Modified features:
- Config whether cache profile file
    - Config `cacheProfile` in `src/config/custom.js`
> The profile file may change when server running, so I add config that can delete profile cache and require profile again to refresh profile in nodejs

- Validate resource in bundle after conversion
    - Add `doValidation` in profile file, example:
    ```js
    module.exports.profile = {
        // Name of the profile
        name: 'example',
    
        // version of the profile
        version: '1.0.0',
    
        // The base URL of the FHIR server, this field will affect the 'fullUrl' element in the generated bundle.
        fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',     // 
    
        // Whether should we do after conversion?
        // 'upload': Upload the converted data to the FHIR server and return the server response.
        // 'return': Don't upload, just return the converted data.
        action: 'upload',

        // Whether validate resource after conversion?
        doValidation: true
    }
    ```
    - Put IG package file (package.tgz) in `lib/validator/igs`
> Use [node-java-fhir-validator](https://github.com/Chinlinlee/node-java-fhir-validator)

> ** Note **
> Validator require jdk >= 11
## TODO
- :white_check_mark: Core Engine
- :white_check_mark: Multipule Profile (Config File) Support
- :white_check_mark: Data Preprocessor
- :white_check_mark: FHIR Data Uploader
- :arrow_right: FHIR Profile Validator

## Requirements
- node.js 16.8.0

## Installation
Clone this repository to your computer
```bash
$ git clone https://github.com/Lorex/FHIR-Universal-Conversion-Kit.git
```

Install npm packages
```bash
$ cd src
$ npm install
```

Install npm packages
```bash
$ cd src
$ npm install
```

Run Service
```bash
$ chmod +x ./start_server
$ ./start_server
```

## API

Server will default listen on port 1337.

API Endpoint
```
POST <serverurl>
```

Payload
```json
{
    "profile": "<Profile Name>",
    "data": [
        "Source Data",
    ]
}
```

Response
```json
{
    "success": true,
    "data": [
        "Response Data"
    ]
}
```


## Profile

If you have many different data source formats, you can create separate profiles (also known as config files) for each of them.
Each profile can define different data sources, source fields, conversion rules, and preprocessors.

**ATTENTION: The 'Profile' in this section is NOT FHIR Profile**

Every source data will be processed and converted as the following workflow: 

![workflow](https://i.imgur.com/6JwsLXC.png)

To define a profile, just create `<profileName>.js` in the `profile` folder simply, the server should automatically load all profiles at the start.

This is an example of the profile:
```javascript
module.exports.profile = {
    // Name of the profile
    name: 'example',

    // version of the profile
    version: '1.0.0',

    // The base URL of the FHIR server, this field will affect the 'fullUrl' element in the generated bundle.
    fhirServerBaseUrl: 'https://hapi.fhir.tw/fhir',     // 

    // Whether should we do after conversion?
    // 'upload': Upload the converted data to the FHIR server and return the server response.
    // 'return': Don't upload, just return the converted data.
    action: 'upload',
}

module.exports.globalResource = {
    // Should be resource name
    Patient: {
        // Defile resource template here
        active: true
        
        // If you want to reference to other resource of this bundle automatically, use '{ reference: #<ResourceType> }'
        managingOrganization: {
            reference: '#Organization',
        }
    },
    Practitioner: {
        active: true,
    },
}

// Global Preprocessor Hook
// Data will run the following function before we iterate each fields
module.exports.beforeProcess = (data) => {
    // Do something
    return data
}

// Define your fields and conversion rules here
module.exports.fields = [
    {
        // Field name of the source data
        source: 'pname',

        // Target element of FHIR resource which source data will converted to
        target: 'Patient.id',

        // Field preprocessor hook before we convert the source data
        beforeConvert: (data) => {
            return `pat-test2-${data}`
        }
    }
]

```
