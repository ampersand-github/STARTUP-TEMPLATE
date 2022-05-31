const firebaseAdminJson = require('../../../firebase-admin.json');

export const firebaseConfig = {
  type: firebaseAdminJson.type,
  projectId: firebaseAdminJson.project_id,
  privateKeyId: firebaseAdminJson.private_key_id,
  privateKey: firebaseAdminJson.private_key,
  clientEmail: firebaseAdminJson.client_email,
  authUri: firebaseAdminJson.auth_uri,
  tokenUri: firebaseAdminJson.token_uri,
  authProviderX509CertUrl: firebaseAdminJson.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseAdminJson.client_x509_cert_url,
};
