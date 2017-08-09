import { OpenIdConnectConfiguration } from "aurelia-open-id-connect";
import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

// https://login.windows.net/common/discovery/keys does not allow CORS
// so we need to configure these keys manually.
import azureSigningKeys from "./azure-signing-keys";
const appHost = "http://localhost:9000";

export default {
  loginRedirectModuleId: "index",
  logoutRedirectModuleId: "index",
  userManagerSettings: <UserManagerSettings>{
    // The number of seconds in advance of access token expiry
    // to raise the access token expiring event.
    accessTokenExpiringNotificationTime: 1,
    // Your own OpenID Provider or a certified authority
    // from the official list http://openid.net/certification/
    // We are using a single tenant Azure Active Directory as our authority.
    // See http://bit.ly/2wrX5Wg for details.
    authority: "https://login.microsoft.com/0252f597-5d7e-4722-bafa-0b26f37dc14f",
    automaticSilentRenew: false,
    // The interval in milliseconds between checking the user's session.
    checkSessionInterval: 10000,
    // The client or application ID that the authority issues.
    client_id: "dc0e8e79-e73c-4ad9-9743-b262320d77d6",
    filterProtocolClaims: true,
    loadUserInfo: false,
    post_logout_redirect_uri: `${appHost}/signout-oidc`,
    redirect_uri: `${appHost}/signin-oidc`,
    response_type: "id_token",
    scope: "openid",
    signingKeys: azureSigningKeys.keys,
    // number of millisecods to wait for the authorization
    // server to response to silent renew request
    silentRequestTimeout: 10000,
    silent_redirect_uri: `${appHost}/signin-oidc`,
    userStore: new WebStorageStateStore({
      prefix: "oidc",
      store: window.localStorage,
    }),
  },
} as OpenIdConnectConfiguration;