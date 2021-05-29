import 'dotenv/config';

export default ({ config }: any) => {
  return {
    ...config,
    extra: {
      SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY
    }
  }
};