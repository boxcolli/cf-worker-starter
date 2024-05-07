import { AutoRouter, cors } from "itty-router"
import configV1 from "./v1/config"
import routerV1 from "./v1/router"

function getRouter(origin: string) {
    const { preflight, corsify } = cors({
		origin: origin,
		maxAge: 84600,
		allowMethods: ['GET', 'POST'],
	})

	return AutoRouter({
		base: '/',
		before: [preflight],
		finally: [corsify],
	})
		.all(`${configV1.base}/*`, routerV1.fetch)
        .all('*', (_, env) => new Response(`I am in ${env.WHICH_ENV}`, { status: 404 }))
}

export default {
    dev: getRouter('*'),
    pro: getRouter('https://some.domain')
}
