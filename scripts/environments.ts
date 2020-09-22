// list of project names and the keys of their necessary secrets
const environmentValidation = {
  'profile-site': ['OPEN_WEATHER_API_KEY'],
};

export const environments = (projectName, isProduction) => {
  environmentValidation[projectName].forEach((envKey) => {
    if (Object.keys(process.env).indexOf(envKey) === -1) {
      throw new Error(`Project is missing ${envKey} property in .env`);
    }
  });
  let environment;
  switch (projectName) {
    case 'profile-site':
      environment = `export const environment = {
      production: ${isProduction},
      OPEN_WEATHER_API_KEY: "${process.env.OPEN_WEATHER_API_KEY}",
      dataPath: 'assets/data/',
      stateJSON: 'data.json'
   };
   `;
      break;
    default:
      environment = null;
      break;
  }
  return environment;
};
