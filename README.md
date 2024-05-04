# cf-worker-starter

A simple opinionated template for cloudflare worker project.
Feel free to copy & modify.

## Notes

I recommend you to put `/.env.vitest` into gitignore list.

Since `@cloudflare/vitest-pool-workers` [cannot run test remotely](https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/), I adopted `vitest`. So you should `$ npm run dev` before `$ npm run test`.

## Dependencies
```json
{
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240502.0",
    "dotenv": "^16.4.5",
    "typescript": "^5.0.4",
    "vitest": "1.3.0",
    "wrangler": "^3.0.0"
  },
  "dependencies": {
    "itty-router": "^5.0.17",
    "pino": "^9.0.0"
  }
}
```
