# cf-worker-starter

A simple opinionated template for cloudflare worker project.
Feel free to copy & modify.

## How to use
1. Download
  ```
  $ gh repo clone boxcolli/cf-worker-starter
  $ npm i
  ```

2. Update gitignore list (those are written as comment initially):
- `.dev.vars`
- `.env.vitest`

## Demo
- https://cf-worker-demo.boxcolli.com
- https://cf-worker-demo.boxcolli.com/v1/hello
- https://cf-worker-demo.boxcolli.com/v1/hello/John

## Notes

### Staging

There are two environments: default and 'pro'. Each time you add an element in `wrangler.toml`, you should configure both, like below:
```toml
# /wrangler.toml
...

[vars]
WHICH_ENV = "dev"

[env.pro.vars]
WHICH_ENV = "pro"
```

If you want to deploy, you run `$ npm run deploy`, which actually is:
```json
// package.json
{
    "scripts": {
      "deploy": "wrangler deploy -e pro",
  },
}
```

About `Secrets`, configure:
- `.dev.vars` file for development
- `npx wrangler secret put <KEY> -e pro` for production.

### CORS

I made two same router instances to deal with different stages. And they are statically configured. It won't affect the performance too much, probably.
```ts
// /src/router.ts
...

export default {
    dev: getRouter('*'),
    pro: getRouter('https://some.domain')
}
```

### Vitest
Since `@cloudflare/vitest-pool-workers` [cannot run test remotely](https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/), I adopted just `vitest`. So you should `$ npm run dev` before `$ npm run test`.

I put an env file to detect the local test url.
```
// /.env.vitest
LOCAL_URL="http://localhost:8787"
```

This value is loaded dynamically with `vitest.setup.ts`.
```ts
// /vitest.setup.ts
export interface Config {
    LOCAL_URL: string
}

const envFile = './.env.vitest'
dotenv.config({ path: envFile })
```

So I recommend you to put `.env.vitest` into gitignore list and modify it freely.

### Dependencies
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
    "http-status-codes": "^2.3.0",
    "itty-router": "^5.0.17",
    "pino": "^9.0.0"
  }
}
```
