import { AutoRouter } from "itty-router"
import config from "./v1/config"
import routerV1 from "./v1/router"

export default AutoRouter({ base: "/" })
    .all(`${config.base}/*`, routerV1.fetch)
    .all('*', () => new Response('Not Found.', { status: 404 }));
