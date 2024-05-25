const handleError = (error, handler) => {
    const errMessage =
        error?.response?.data?.message ||
        'Unexpected error occured. Please, try again later';
    console.log(error);
    handler(errMessage);
}

export default handleError;