export const WEB_SERVICE_PORT = 3000;
export const EDITOR_SERVICE_PORT = 3000;
export const CDN_SERVICE_PORT = 3000;
export const USER_SERVICE_PORT = 80;
export const DATA_SERVICE_PORT = 80;
export const POST_SERVICE_PORT = 80;

export const CDN_SERVER = "md_srv_cdn";
export const DATA_SERVER = "md_srv_data";
export const EDITOR_SERVER = "md_srv_editor";
export const POST_SERVER = "md_srv_post";
export const USER_SERVER = "md_srv_user";
export const WEB_SERVER = "md_srv_web";

export const HASH_SALT = 12;

export const DATABASE_CONNECTION_SETTINGS = {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
};

export const AUTH_TOKEN_SETTINGS = {
  sessionTokenExpiration: "1d",
  sessionTokenSecret: process.env.SESSION_KEY_SECRET,
  refreshTokenExpiration: "7d",
  refreshTokenExpirationD: 7,
  refreshTokenSecret: process.env.REFRESH_KEY_SECRET
};
