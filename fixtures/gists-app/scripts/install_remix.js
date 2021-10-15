#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");

let buildDir = path.resolve(__dirname, "../../../build/node_modules");
let installDir = path.resolve(__dirname, "../node_modules");

async function run() {
  // Install all remix packages
  await fs.ensureDir(installDir);
  await fs.copy(buildDir, installDir);

  let cli = path.resolve(installDir, "@remix-run/dev/cli.js");
  let symlink = path.resolve(installDir, ".bin/remix");
  await fs.chmod(cli, "755");
  await fs.createSymlink(cli, symlink);
  await fs.chmod(symlink, "755");
}

run().then(
  () => {
    process.exit(0);
  },
  error => {
    console.error(error);
    process.exit(1);
  }
);
