import { expect, test } from 'vitest'
import setup from "../../vitest.setup"
import config from './config'

test('hello world test', async () => {
    const url = `${setup.env.LOCAL_URL}${config.base}${config.hello}`
    const response = await fetch(url)

    const text = await response.text()
    console.log({ text: text })

    expect(response.status).toBe(200)
    expect(text).toBe('Hello World!')
})

test('hello name test', async () => {    
    const name = 'John'
    const url = `${setup.env.LOCAL_URL}${config.base}${config.hello}/${name}`

    const response = await fetch(url)
    const text = await response.text()
    console.log({ text: text })

    expect(response.status).toBe(200)
    expect(text).toBe(`Hello ${name}!`)
})
