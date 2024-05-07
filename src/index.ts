/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Bundle } from "./pkg/bundle/bundle"
import router from "./router"
import logger from "./pkg/logger/logger"
import { getLogBase } from "./pkg/logger/format";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const logBase = getLogBase(new URL(request.url).pathname)

		switch (env.WHICH_ENV) {
		case 'dev':
			{
				const bun: Bundle = {
					logger: logger.dev.child(logBase)
				}
				return router.dev.fetch(request, env, ctx, bun)
			}
		default:
			{
				const bun: Bundle = {
					logger: logger.pro.child(logBase)
				}
				return router.pro.fetch(request, env, ctx, bun)
			}
		}
	},
}
