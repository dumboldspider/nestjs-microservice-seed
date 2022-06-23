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

const watch = require('node-watch');

watch(
  './',
  {
    recursive: true,
    filter(f, skip) {
      if (/node_modules/.test(f)) return skip;
      if (/\.github/.test(f)) return skip;
      if (/dist/.test(f)) return skip;
      if (/\.git/.test(f)) return skip;
      if (/\.next/.test(f)) return skip;
      return true;
    },
  },
  (event, filepath) => {
    const repoName = __dirname.split('/').pop(); // get the current folder name
    const remoteDirectory = `${remoteFolder}/${repoName}`; // /home/docker/DADT-Nest

    const fileName = path.normalize(filepath).split('/').pop(); // index.js
    const fileDir = path.normalize(filepath).replace(fileName, ''); // src/

    const localFile = `${__dirname}/${fileDir}`; // /home/docker/DADT-Nest/src/index.js
    const remoteFile = `${remoteDirectory}/${fileDir}`;

    // console.log(localFile, remoteFile);

    console.log('\x1b[32m', `${filepath} changed. Syncing...`, '\x1b[0m');
    spawn(
      'rsync',
      [
        '-aP',
        '--delete',
        '--chown=npm_agent:docker',
        '--exclude=node_modules',
        // '--exclude=dist',
        '--exclude=.next',
        '--exclude=.git',
        '--exclude=.github',
        localFile,
        `${remoteHost}:${remoteFile}`,
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', (code) => {
      if (code !== 0) {
        console.log('\x1b[31m', `Exited with code ${code}`, '\x1b[0m');
      } else {
        console.log('\x1b[32m', `File synced`, '\x1b[0m');

        if (fileName === 'package.json') {
          console.log('\x1b[32m', `Installing libraries...`, '\x1b[0m');
          spawn('node', ['./install.dev.js']).on('close', (code) => {
            if (code !== 0) {
              console.log('\x1b[31m', `Exited with code ${code}`, '\x1b[0m');
            } else {
              console.log('\x1b[32m', `Libraries installed`, '\x1b[0m');
            }
          });
        }
      }
    });
  },
);
