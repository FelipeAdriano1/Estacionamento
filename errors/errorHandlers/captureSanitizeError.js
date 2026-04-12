export default function captureSanitizeError(err, req, res, next) {
    if (err.name !== "SanitizeError") return next(err);
    return res.status(err.status).json({
        error: err.name,
        message: err.message,
        errors: err.errors
    });
}