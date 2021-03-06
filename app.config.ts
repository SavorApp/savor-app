import "dotenv/config";

export default ({ config }: any) => {
  return {
    ...config,
    extra: {
      SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER: process.env.FIREBASE_MESSAGING_SENDER,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      SAVORED_SERVER_ENDPOINT: process.env.SAVORED_SERVER_ENDPOINT,
    },
  };
};
