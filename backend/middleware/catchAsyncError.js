export const catchAsyncErr = (passedFun) => (req, resp, next) => {
    Promise.resolve(passedFun(req, resp, next)).catch(next)
}