const getErrorMessage = error => {
    const errMessage =
        error?.response?.data?.message ||
        'Unexpected error occured. Please, try again later';
    console.log(error);
    return errMessage;
}

export default getErrorMessage;