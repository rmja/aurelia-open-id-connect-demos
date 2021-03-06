import { Aurelia } from "aurelia-framework"
import environment from "./environment";
import oidcConfig from "./open-id-connect-configuration-auth0";
// import oidcConfig from "./open-id-connect-configuration-azure";
// import oidcConfig from "./open-id-connect-configuration-identity-server";

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature("resources");

  // Simplified configuration as of v0.19.0.
  aurelia.use.plugin("aurelia-open-id-connect", () => oidcConfig);

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin("aurelia-testing");
  }

  await aurelia.start();
  
  await aurelia.setRoot("app");
}
