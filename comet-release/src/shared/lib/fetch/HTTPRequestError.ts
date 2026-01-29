export class HTTPRequestError extends Error {
    options?: { body?: unknown; parsed?: boolean }

    constructor(message: string, options?: { body?: unknown; parsed?: boolean }) {
        super(message)
        this.options = options
    }

    isParsed(): this is {
        message: string
        options: { parsed: true; body: unknown }
    } {
        return Boolean(this.options?.parsed)
    }
}
