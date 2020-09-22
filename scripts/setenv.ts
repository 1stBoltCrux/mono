// run before compilation to create an environment file that contains our .env config

const { writeFile } = require('fs');
const { argv } = require('yargs');
const { spawn } = require('child_process');
import * as prompt from 'prompt';
const colors = require('colors/safe');
import { environments } from './environments';

prompt.message = colors.white('Enter project name');

var path = require('path');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
let projectEnvironmentsDirectory;

if (!process.env.OPEN_WEATHER_API_KEY) {
  console.error('Please provide OPEN_WEATHER_API_KEY in .env file');
  process.exit(-1);
}

prompt.start();

prompt.get('projectName', (err, result) => {
  if (err) {
    return onError(err);
  }
  const { projectName } = result;
  projectEnvironmentsDirectory = `./apps/${projectName}/src/environments/`;
  const targetPath = isProduction
    ? `${projectEnvironmentsDirectory}environment.prod.ts`
    : `${projectEnvironmentsDirectory}environment.ts`;
  // we have access to our environment variables
  // in the process.env object thanks to dotenv
  const environmentFileContent = environments(projectName, isProduction)

  // write the content to the respective file
  writeFile(targetPath, environmentFileContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Wrote variables to ${targetPath}`);
    }
  });

  const ngServeProject = spawn('ng', ['serve', projectName]);

  ngServeProject.stdout.on('data', (data) => {
    console.log(data.toString('utf-8'));
  });

  ngServeProject.stderr.on('data', (data) => {
    console.log(data.toString('utf-8'));
  });

  ngServeProject.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  ngServeProject.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

const onError = (err) => {
  console.log(err);
  return 1;
};
