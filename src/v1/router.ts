import { AutoRouter } from "itty-router"
import hello from "./hello"
import config from "./config"

export default AutoRouter({ base: config.base })
    .get(`${config.hello}${config.helloParam}`, hello)
