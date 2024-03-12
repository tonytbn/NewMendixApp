import { domainmodels } from "mendixmodelsdk";
import { IMendixPlatformConfig, MendixPlatformClient, setPlatformConfig } from "mendixplatformsdk";

async function main() {
    // Directly specify the Mendix Token (use with caution)
    const mendixConfig: Partial<IMendixPlatformConfig> = {
        mendixToken: '7YNY2xWrUFewR62tnRg9GAApXEwLXDmmKMcFoiewfXLMCtxNMoJza8k8XBwoECdHLgVK2xYzQApzJJME1p6kAvLaDvg6cG3k2zgq',
        // Include other properties as required by IMendixPlatformConfig
    };    
    
    setPlatformConfig(mendixConfig);
    // Initialize the Mendix Platform Client with the token
    const client = new MendixPlatformClient();


    const app = await client.createNewApp(`NewApp-${Date.now()}`, {
        repositoryType: "git",
    });

    const workingCopy = await app.createTemporaryWorkingCopy("main");
    const model = await workingCopy.openModel();

    const domainModelInterface = model.allDomainModels().filter(dm => dm.containerAsModule.name === "MyFirstModule")[0];
    const domainModel = await domainModelInterface.load();

    const entity = domainmodels.Entity.createIn(domainModel);
    entity.name = `NewEntity_${Date.now()}`;

    await model.flushChanges();

    await workingCopy.commitToRepository("main");
}

main().catch(console.error);