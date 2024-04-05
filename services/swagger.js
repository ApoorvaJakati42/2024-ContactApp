const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SalesSimplify ContactApp - API Documentation',
            version: '1.0.0',
            description: 'API documentation for Contact application',
        },
        components: {
            schemas: {
              Contact: {
                type: 'object',
                properties: {
                  id: { type: String, required: true, unique: true },
                  firstName: { type: 'string', description: 'Mandatory, Only Alphabets, Min. Length 3' },
                  lastName: { type: 'string', description: 'Mandatory, Only Alphabets, Min. Length 3' },
                  gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHERS'], description: 'Mandatory, Only (MALE or FEMALE or OTHERS)' },
                  address: {
                    type: 'object',
                    properties: {
                      line1: { type: 'string', description: 'Mandatory, Any String/Symbol/Characters, Min. Length 8' },
                      line2: { type: 'string', description: 'Optional, Any String/Symbol/Characters, any length' },
                      city: { type: 'string', description: 'Mandatory, String/Symbol/Characters, any length' },
                      country: { type: 'string', description: 'Mandatory, Any String/Symbol/Characters, any length, all caps' },
                      zipCode: { type: 'string', description: 'Mandatory, Any String/Symbol/Characters, Max length 10' }
                    }
                  },
                  email: { type: 'string', format: 'email', description: 'Mandatory, valid email eg. any_valid@email.format' },
                  phone: { type: 'string', description: 'Mandatory, only numbers, eg. 1234567890' }
                },
                required: ['id', 'firstName', 'lastName', 'gender', 'address', 'email', 'phone']
              }
            }
          }
    },
    apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = specs;
