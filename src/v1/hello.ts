import { IRequest } from "itty-router"
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
    
    if (params.name == undefined) {
        return new Response('Hello World!')
    }

    return new Response(`Hello ${params.name}!`, { status: 200 })
}
