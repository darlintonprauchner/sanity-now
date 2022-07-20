// Some imports needed for this test
const chai = require('chai');
const fs = require('fs');
const path = require('path');

describe('Config Should Make Sense', () => {
    // Let's load every config file available
    const configDirectory = 'config'
    const allConfigFiles = fs
        .readdirSync(configDirectory)
        .map(one => ({
            [one]: JSON.parse(
                fs.readFileSync(
                    path.join(configDirectory, one),
                    'utf-8'
                )
            )
        }))
        .reduce((prev, cur) => ({ ...prev, ...cur }))

    it('All environments have the same config keys', () => {
        // No file is considered "right", they all must match and that's all
        for (const oneConfigFile of Object.keys(allConfigFiles)) {
            for (const anotherConfigFile of Object.keys(allConfigFiles)) {
                chai.expect(Object.keys(allConfigFiles[oneConfigFile]))
                    .to.deep.equal(Object.keys(allConfigFiles[anotherConfigFile]), `${oneConfigFile} should match config keys of ${anotherConfigFile}`);
            }
        }
    });

    it('No config keys are empty', () => {
        for (const oneConfigFile of Object.keys(allConfigFiles)) {
            for (const onePropertyValue of Object.keys(allConfigFiles[oneConfigFile])) {
                // Null check as a rule, or any other rules you might imagine..
                chai.expect(allConfigFiles[oneConfigFile][onePropertyValue]).to.not.equal(null, `${oneConfigFile}.${onePropertyValue} should not be null`);
            }
        }
    });

    // What else can we add here? Check type match between config properties?
});

