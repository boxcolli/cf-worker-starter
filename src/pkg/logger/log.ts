import { getId } from "./id"

interface LogBase {
    qid: string     // request id
    path: string
}

interface LogContent {
    time: number
    event: string
    data: any
}

export function logBase(path: string): LogBase {
    return {
        qid: getId(),
        path: path,
    }
}

export function logContent(event: string, data: any): LogContent {
    return {
        time: Date.now(),
        event: event,
        data: data,
    }
}
