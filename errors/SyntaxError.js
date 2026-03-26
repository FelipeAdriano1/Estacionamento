export default function captureSyntaxError(err, req, res, next) {
    const isJsonSyntaxError = err instanceof SyntaxError && err.status === 400 && Object.hasOwn(err, 'body');

    if (isJsonSyntaxError) {
        return res.status(400).json({ message: "JSON mal formatado." });
    }

    return next(err);
}