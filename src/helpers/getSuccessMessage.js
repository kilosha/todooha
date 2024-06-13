const getSuccessMessage = status => {
    switch (status) {
        case 'postSuccessful':
            return 'Task was added successfully';
        case 'deleteSuccessful':
            return 'Task was deleted successfully';
        case 'updateSuccessful':
            return 'Task was updated successfully';
        default:
            return "Success";
    }
}

export default getSuccessMessage;