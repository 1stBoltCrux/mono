export const environments = (projectName, isProduction) => {
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
