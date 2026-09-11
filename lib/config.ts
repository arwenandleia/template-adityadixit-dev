type SiteConfig = {
  db: DBConfig;
};
type DBConfig = {
  url: string;
  urlProd: string;
};

const cfg: SiteConfig = {
  db: {
    url: getEnvOrThrow("DATABASE_URL"),
    urlProd: getDBurlForProd(),
  },
};

export default cfg;

function getDBurlForProd(): string {
  try {
    return getEnvOrThrow("DATABASE_URL_PROD");
  } catch (err) {
    console.log(err);
    return getEnvOrThrow("DATABASE_URL");
  }
}

function getEnvOrThrow(envName: string): string {
  const envValue = process.env[envName];
  if (!envValue) {
    throw new Error(`ENV variable ${envName} not found`);
  }
  return envValue;
}
