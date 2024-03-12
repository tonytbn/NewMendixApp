"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mendixmodelsdk_1 = require("mendixmodelsdk");
const mendixplatformsdk_1 = require("mendixplatformsdk");
async function main() {
    // Directly specify the Mendix Token (use with caution)
    const mendixConfig = {
        mendixToken: '7YNY2xWrUFewR62tnRg9GAApXEwLXDmmKMcFoiewfXLMCtxNMoJza8k8XBwoECdHLgVK2xYzQApzJJME1p6kAvLaDvg6cG3k2zgq',
        // Include other properties as required by IMendixPlatformConfig
    };
    (0, mendixplatformsdk_1.setPlatformConfig)(mendixConfig);
    // Initialize the Mendix Platform Client with the token
    const client = new mendixplatformsdk_1.MendixPlatformClient();
    const app = await client.createNewApp(`NewApp-${Date.now()}`, {
        repositoryType: "git",
    });
    const workingCopy = await app.createTemporaryWorkingCopy("main");
    const model = await workingCopy.openModel();
    const domainModelInterface = model.allDomainModels().filter(dm => dm.containerAsModule.name === "MyFirstModule")[0];
    const domainModel = await domainModelInterface.load();
    const entity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
    entity.name = `NewEntity_${Date.now()}`;
    await model.flushChanges();
    await workingCopy.commitToRepository("main");
}
main().catch(console.error);
