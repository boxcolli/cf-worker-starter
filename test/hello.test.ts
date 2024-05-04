import { expect, test } from 'vitest'
import setup from "../vitest.setup"

test("hello static var", () => {
  expect(setup.helloVar).toBe('Hello World!')
})

test("hello env var", () => {
  expect(setup.env.HELLO_VAR).toBe('Hello World!')
})
