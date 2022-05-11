function initializeSearch() {
    search.on('input', () => {
        const text = search.val();
        if (text != '') {
            if (users)
                users.forEach(function (user) {
                    const id = user.id;
                    data = [user.firstName, user.lastName, user.email];
                    if (RegExp(text, 'i').test(data)) {
                        unfilterUser(id);
                    } else {
                        filterUser(id);
                    }
                })
        } else {
            if (filteredUsers)
                filteredUsers.forEach(function (user) {
                    user.filter = false;
                })
        }
        showRows(1);
    })
}
