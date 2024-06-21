const getAuthToken = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return token;
}

export default getAuthToken;