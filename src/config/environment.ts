import { config } from "./env";

export const getEnvVariable = (key: keyof typeof config) => {
  return config[key];
};
