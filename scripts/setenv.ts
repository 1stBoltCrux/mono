// run before compilation to create an environment file that contains our .env config

const { writeFile } = require('fs');
const { argv } = require('yargs');
const { spawn } = require('child_process');
import * as prompt from 'prompt';
import { environments } from './environments';
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
// set up prompt message and prompt message color
prompt.message = ('Enter project name');
const isProduction = environment === 'prod';
let projectEnvironmentsDirectory;

prompt.start();

prompt.get('projectName', (err, result) => {
  if (err) {
    console.log(err);
    return 1;
  }
  const { projectName } = result;
  projectEnvironmentsDirectory = `./apps/${projectName}/src/environments/`;
  const targetPath = isProduction
  ? `${projectEnvironmentsDirectory}environment.prod.ts`
  : `${projectEnvironmentsDirectory}environment.ts`;
  const environmentFileContent = environments(projectName, isProduction);
  
  writeFile(targetPath, environmentFileContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Wrote variables to ${targetPath}`);
    }
  });
  
  // ng serve the project and log the output 
  
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
