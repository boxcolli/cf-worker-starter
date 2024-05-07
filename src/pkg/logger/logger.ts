import pino from "pino"

export default {
    dev: pino({ level: 'trace' }),
    pro: pino({ level: 'info' }),
}
