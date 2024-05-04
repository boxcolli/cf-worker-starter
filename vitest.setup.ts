import * as dotenv from 'dotenv'

export interface Config {
    HELLO_VAR: string
    LOCAL_URL: string
}

const envFile = './.env.vitest'
dotenv.config({ path: envFile })

export default {
    helloVar: 'Hello World!',
    env: process.env as unknown as Config
}
