import { AutoRouter, IRequest, cors } from "itty-router"
import configV1 from "./v1/config"
import routerV1 from "./v1/router"
import { Bundle } from "./pkg/bundle/bundle"
import { logContent } from "./pkg/logger/log"

/**
 *	Request logger
 */
function logRequest(request: Request, _: Env, __: ExecutionContext, bun: Bundle) {
	bun.logger.info(logContent('request', request))
}

/**
 *	Response logger
 */
function logResponse(response: Response, _: IRequest, __: Env, ___: ExecutionContext, bun: Bundle) {
	bun.logger.info(logContent('response', response))
}

/**
 * 	A router factory
 * @param origin CORS management
 * @returns configured router
 */
function getRouter(origin: string) {
    const { preflight, corsify } = cors({
		origin: origin,
		maxAge: 84600,
		allowMethods: ['GET', 'POST'],
	})

	return AutoRouter({
		base: '/',
		before: [preflight, logRequest],
		finally: [corsify, logResponse],
	})
		.all(`${configV1.base}/*`, routerV1.fetch)
        .all('*', (_, env) => new Response(`I am in ${env.WHICH_ENV}`, { status: 404 }))
}

export default {
    dev: getRouter('*'),
    pro: getRouter('https://some.domain')
}
