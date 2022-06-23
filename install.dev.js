/*
  to use the dev server, you need to run the following command:
  $ yarn add i -D node-watch dotenv
  $ yarn run watch
*/

const ENV_NAME = '.env';

const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, ENV_NAME) });

const remoteFolder = process.env.DEV_REMOTE_FOLDER;
const remoteHost = process.env.DEV_REMOTE_HOST;
const nodeVersion = process.env.DEV_NODE_VERSION;
const repoName = __dirname.split('/').pop(); // get the current folder name

spawn(
  'ssh',
  [
    remoteHost,
    `cd ${remoteFolder}/${repoName} && export PATH="/home/npm_agent/.nvm/versions/node/${nodeVersion}/bin:$$PATH" && yarn && pm2 restart ${repoName}`,
  ],
  {
    stdio: 'inherit',
  },
).on('close', (code) => {
  if (code !== 0) {
    console.log('\x1b[31m', `Exited with code ${code}`, '\x1b[0m');
  } else {
    console.log('\x1b[32m', `Installed successful`, '\x1b[0m');
  }
});
