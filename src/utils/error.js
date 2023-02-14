export class BadRequest extends Error {
    constructor (message = 'Bad Request') {
        super (message);
    }
}

export class NotFound extends Error {
    constructor (message = 'Not Found') {
        super (message);
    }
}

export class InvalidParams extends Error {
    constructor (message = 'Invalid Params') {
        super (message);
    }
}