const getErrorMessage = payload => {
    const errMessage =
        payload?.data?.message ||
        'Unexpected error occured. Please, try again later';
    return errMessage;
}

export default getErrorMessage;