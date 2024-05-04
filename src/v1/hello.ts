import { IRequest } from "itty-router"
import { StatusCodes } from 'http-status-codes'
import { Bundle } from "../pkg/bundle/bundle"
import config from "./config"

// You can export this.
interface HelloParams {
    name: string
}

export default async function hello(
    request: IRequest,
    env: Env,
    ctx: ExecutionContext,
    bun: Bundle,
): Promise<Response> {
    const params = request.params as unknown as HelloParams
    console.log({
        path: `${config.base}${config.hello}`,
        params: params
    })

    const phrase = (params.name == undefined) ? 'Hello World!' : `Hello ${params.name}!`

    return new Response(phrase, { status: StatusCodes.OK })
}
