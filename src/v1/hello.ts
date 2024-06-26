import { IRequest } from "itty-router"
import { StatusCodes } from 'http-status-codes'
import { Bundle } from "../pkg/bundle/bundle"
import config from "./config"
import { logContent } from "../pkg/logger/log"

// Export this to use at tests
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

    bun.logger.debug(logContent('params', params))

    const phrase = (params.name == undefined) ? 'Hello World!' : `Hello ${params.name}!`

    return new Response(phrase, { status: StatusCodes.OK })
}
