const path = require('path');
const {exec, execSync} = require('child_process');
const fs = require('fs');

const axios = require('axios');

const dotenv = require('dotenv')

dotenv.config();

function siteName() {
  let branch;
  branch = branch || process.env.CIRCLE;
  branch =
    branch ||
    (process.env.GITHUB_REF &&
      process.env.GITHUB_REF.replace('refs/heads/', ''));
  branch = branch || execSync('git rev-parse --abbrev-ref HEAD').toString();
  const site = branch.match(/brands\/(.*?)\//)[1];
  console.log(`Branch: ${branch}, Site: ${site}`);

  return site;
}

function copyIndexFiles(site_name) {
  const faviconPath = `./scripts/setup-public/${site_name}/favicon.ico`;
  if (fs.existsSync(faviconPath)) {
    fs.copyFileSync(faviconPath, `./public/favicon.ico`);
  }
  fs.copyFileSync(
    `./scripts/setup-public/${site_name}/index.html`,
    `./public/index.html`
  );

  console.log(`${site_name} public assets were copied to /public`);
}

async function run() {
  const args = process.argv.slice(2);
  if (args[0] === '') {
    throw new Error('Expected command');
  }
  if (!process.env.REACT_APP_META_PATH) {
    throw new Error('REACT_APP_META_PATH required');
  }
  const site_name = process.env.REACT_APP_SITE_NAME || siteName();
  console.log('Deploying to', site_name);
  copyIndexFiles(site_name);
  const url = `${process.env.REACT_APP_META_PATH}api/clients/metadata`;
  const {data: brandData} = await axios.get(`${url}?site_name=${site_name}`);
  if (!brandData.publicUrl) {
    throw new Error('Unexpected brand data');
  }
  console.log('Brand Data', url, brandData);
  const SEPARATOR = ':';
  const env = {...process.env};
  env.NODE_PATH = './src:./src/components';
  env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;
  env.REACT_APP_S3_PATH = `https://${brandData.s3UploadsBucket}.s3.amazonaws.com/uploads/`;
  env.REACT_APP_S3_UPLOAD_BUCKET = brandData.s3UploadsBucket;
  env.REACT_APP_SHARP_PATH = 'https://images.cheddarcdn.com/';
  env.REACT_APP_STRIPE_PUBLISHABLE_KEY = brandData.stripePublishableKey;
  env.REACT_APP_SITE_NAME = site_name;
  env.REACT_APP_SITE_URL = brandData.publicUrl;
  if (brandData.publicUrl === 'https://marketplace-dev.pixielane.com') {
    env.PUBLIC_URL = 'https://marketplace-dev-assets.cheddarcdn.com';
  } else if (brandData.publicUrl === 'https://uiaws-dev.cheddarup.com') {
    env.PUBLIC_URL = 'https://uiaws-dev-assets.cheddarcdn.com';
  } else if (brandData.publicUrl === 'https://my.cheddarup.com') {
    env.PUBLIC_URL = 'https://prod-assets.cheddarcdn.com';
  } else if (brandData.publicUrl === 'https://marketplace.pixielane.com') {
    env.PUBLIC_URL = 'https://marketplace-assets.cheddarcdn.com';
  } else {
    env.PUBLIC_URL = brandData.publicUrl;
  }
  env.CLOUDFRONT_ID = brandData.cloudfrontId;
  env.REACT_APP_CLIENT_ID = brandData.uuid;
  env.S3_DEPLOYMENT_BUCKET = brandData.s3Bucket;
  if (brandData.twoFactorDisabled) {
    env.REACT_APP_TWO_FACTOR_DISABLED = true;
  }
  if (brandData.selfSignupDisabled) {
    env.REACT_APP_SELF_SIGNUP_DISABLED = true;
  }
  console.log('Running', args[0], 'with', env);
  const cmd = await exec(args[0], {
    cwd: process.cwd(),
    env,
  });
  cmd.stdout.on('data', (data) => {
    console.log(data);
  });
  cmd.stderr.on('data', (data) => {
    console.log(`ERROR: ${data}`);
  });
  cmd.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
  });
}

run();
