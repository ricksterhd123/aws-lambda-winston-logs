class APIError extends Error {
    constructor(response) {
        super();
        this.errorType = "APIError";
        this.message = response;
    }
}

module.exports = {
    APIError
};
