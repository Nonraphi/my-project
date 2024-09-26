const fetchUsers = async () => {
    try {
        const res = await fetch('http://localhost:3000/user');
        const jsonData = await res.json();
        console.log(jsonData);
        const { data } = jsonData;
        return data
    } catch (err) {
        console.error(`[ERROR FETCHING USER]: ${err.message}`)
    }
}

const main = async () => {
    const users = await fetchUsers();
    console.log(users)

    const tableHeader = document.getElementById('header-row')
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''

    if (users.length === 0) {
        tableHeader.classList.add('hidden')
    } else {
        tableHeader.classList.remove('hidden')
        addUserToTable(users)
    }
}

const addUserToTable = (users) => {
    const tableBody = document.getElementById('table-body');

    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        const originalDate = new Date(user.u_birth_date);
        const localDate = new Date(originalDate.getTime() - originalDate.getTimezoneOffset() * 60000);
        const dateOnly = localDate.toISOString().split('T')[0];

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.u_name}</td>
            <td>${dateOnly}</td>
            <td>
                <button class="btn btn-edit" onclick="handleEdit(${user.id})">✏️ Edit</button>
                <button class="btn btn-delete" onclick="handleDelete(${user.id})">🗑️ Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

const handleSearch = async (event) => {
    event.preventDefault();
    const searchValue = document.getElementById('search-input').value.trim();

    if (!searchValue) {
        return main();
    }

    let users;

    if (!isNaN(searchValue)) {
        users = await fetchUserById(searchValue);
    } else {
        users = await fetchUserByName(searchValue);
    }

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    if (users && users.length > 0) {
        addUserToTable(users);
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="4" style="text-align:center;">User Not Found</td>
        `;
        tableBody.appendChild(row);
    }
}

const fetchUserById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/user/${id}`);
        if (res.ok) {
            const userData = await res.json();
            return [userData.data[0]]; 
        }
    } catch (err) {
        console.error(`[ERROR FETCHING USER BY ID]: ${err.message}`);
    }
    return null;
}

const fetchUserByName = async (name) => {
    try {
        const res = await fetch(`http://localhost:3000/user/name/${name}`);
        if (res.ok) {
            const userData = await res.json();
            return userData.data; 
        }
    } catch (err) {
        console.error(`[ERROR FETCHING USER BY NAME]: ${err.message}`);
    }
    return null;
}

document.getElementById('submit-search').addEventListener('click', handleSearch);

const submitForm = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;

    try {
        const res = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ u_name: name, u_birth_date: date })
        });

        if (res.ok) {
            main();
            document.getElementById('user-modal').style.display = 'none';
            document.getElementById('user-form').reset();
        } else {
            const errorData = await res.json();
            console.error('ERROR FETCHING:', errorData.message || 'Unknown error');
        }
    } catch (err) {
        console.error(`[ERROR FETCHING USER]: ${err.message}`);
    }
}

document.getElementById('user-form').addEventListener('submit', submitForm);

const handleEdit = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/user/${id}`);
        const userData = await res.json();

        console.log(userData.data[0].id)
        if (res.ok && userData) {
            const originalDate = new Date(userData.data[0].u_birth_date);
            const localDate = new Date(originalDate.getTime() - originalDate.getTimezoneOffset() * 60000);
            const formattedBirthDate = localDate.toISOString().split('T')[0];

            document.getElementById('edit-id').innerHTML = 'ID ' + userData.data[0].id;
            document.getElementById('edit-u_name').value = userData.data[0].u_name || 'ไม่ทราบชื่อ';
            document.getElementById('edit-u_date').value = formattedBirthDate;

            document.getElementById('edit-user-form').dataset.userId = id;
            document.getElementById('edit-user-modal').style.display = 'flex';
        } else {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', userData.message || 'ข้อมูลผิดพลาด');
        }
    } catch (err) {
        console.error(`ข้อผิดพลาดในการดึงข้อมูลผู้ใช้: ${err.message}`);
    }
};

const submitEditForm = async (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-user-form').dataset.userId;
    const name = document.getElementById('edit-u_name').value;
    const date = document.getElementById('edit-u_date').value;

    try {
        const res = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ u_name: name, u_birth_date: date })
        });

        if (res.ok) {
            main();
            document.getElementById('edit-user-modal').style.display = 'none';
            document.getElementById('edit-user-form').reset();
        } else {
            const errorData = await res.json();
            console.error('ERROR UPDATING:', errorData.message || 'Unknown error');
        }
    } catch (err) {
        console.error(`[ERROR UPDATING USER]: ${err.message}`);
    }
}

document.getElementById('edit-user-form').addEventListener('submit', submitEditForm);

const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const res = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                main();
            } else {
                const errorData = await res.json();
                console.error('Error deleting user:', errorData.message);
            }
        } catch (err) {
            console.error(`[ERROR DELETING USER]: ${err.message}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const addModal = document.getElementById('user-modal');
    const editModal = document.getElementById('edit-user-modal');
    const btn = document.getElementById('open-modal');
    const closeBtn = document.querySelector('.close');
    const closeBtnEdit = document.querySelector('.close-edit');

    btn.onclick = function () {
        addModal.style.display = 'flex';
    };

    closeBtn.onclick = function () {
        addModal.style.display = 'none';
    };

    closeBtnEdit.onclick = function () {
        editModal.style.display = 'none'
    }

    window.onclick = function (event) {
        if (event.target === addModal) {
            addModal.style.display = 'none';
        } else if (event.target === editModal) {
            editModal.style.display = 'none'
        }
    };
});

main()