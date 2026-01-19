#!/usr/bin/env node
// Small helper script to generate OpenAPI types and/or client using npx.
// This script does not execute anything automatically; run it locally when ready:
// node scripts/generate-openapi.js --types
// node scripts/generate-openapi.js --client

import { spawnSync } from 'child_process';

const args = process.argv.slice(2);
const specUrl = process.env.SHIPIANDO_API_SPEC || 'http://localhost:3001/api-json';

if (args.includes('--types')) {
  console.log(`Running: npx openapi-typescript ${specUrl} --output src/contracts/api.ts`);
  const res = spawnSync('npx', ['openapi-typescript', specUrl, '--output', 'src/contracts/api.ts'], { stdio: 'inherit' });
  process.exit(res.status ?? 0);
}

if (args.includes('--client')) {
  console.log(`Running: npx @openapitools/openapi-generator-cli generate -i ${specUrl} -g typescript-fetch -o tmp/openapi-client --additional-properties=supportsES6=true`);
  const res = spawnSync('npx', ['@openapitools/openapi-generator-cli', 'generate', '-i', specUrl, '-g', 'typescript-fetch', '-o', 'tmp/openapi-client', '--additional-properties=supportsES6=true'], { stdio: 'inherit' });
  process.exit(res.status ?? 0);
}

console.log('Usage: node scripts/generate-openapi.js --types | --client');
console.log('Set SHIPIANDO_API_SPEC to override spec URL (e.g. http://localhost:3001/api-json)');
process.exit(1);
