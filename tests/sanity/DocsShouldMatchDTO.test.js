// Some imports needed for this test
const chai = require('chai');
const fs = require('fs');
const yaml = require('js-yaml');
const dto = require('../../src/dto');

// Utility function to match DTO name with OpenAPI endpoint
const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

describe('OpenAPI should match DTO', () => {
    // Loading OpenAPI file
    const openApi = yaml.load(fs.readFileSync('docs/openapi.yml'));

    it('Endpoint name should have a matching DTO definition', () => {
        // For each path defined on OpenAPI
        for (const path of Object.keys(openApi.paths)) {
            // Let's build what is the expected DTO name, based on your naming conventions
            const expectedDTO = `${capitalize(path.slice(1))}DTO`;

            // And check that it actually exists
            chai.expect(dto[expectedDTO]).to.not.equal(null, `${expectedDTO} should have been defined`);

            // This test will ensure that a new endpoint has a DTO, and no typos exist between them
        }
    });

    it('DTO properties should match OpenAPI schema', () => {
        // For each path defined on OpenAPI

        for (const path of Object.keys(openApi.paths)) {
            // Let's build what is the expected DTO name, based on your naming conventions
            const expectedDTO = `${capitalize(path.slice(1))}DTO`;

            // And build an instance of it!
            const instance = new dto[expectedDTO]();

            // Now we can check that the properties defined, actually exist on the DTO!
            chai.expect(
                // On a real scenario, there are packages that will extract this fro OpenAPI for you
                Object.keys(openApi.paths[path].get.responses[200].content['application/json'].schema.properties)
            ).to.deep.equal(
                Object.keys(instance),
                `${path} contract should match DTO`
            );
        }
    });

    // What else can we add here? Can we instantiate the DTO with the "example" values from OpenAPI?
});

