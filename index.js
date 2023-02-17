let users;

const getUsers = () => {
    if (localStorage.getItem("users") == null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem("users"));
    }
};

let d = new Date();
d.setDate(d.getDate() - 1);
document.getElementById("date").max = d.toISOString().split("T")[0];

const setError = (id, message) => {
    let ele = document.getElementById(id);
    ele.querySelector(".error").innerHTML = message;
};

const getRadioValue = () => {
    let radioBtn = document.getElementsByName("gender");
    let selected = Array.from(radioBtn).find((radio) => radio.checked);
    return selected.value;
};

const setRadioValue = (gender) => {
    document.getElementById(gender).checked = true;
};

const formValidate = () => {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let gender = document.getElementsByName("gender");

    let valid = true;

    if (name == "") {
        setError("uname", "Plese Enter Your Name");
        document.getElementById("name").classList.add("border-red");
        valid = false;
    } else if (name.length <= 2 || name.length > 20) {
        setError("uname", "Username must be between 2 to 20");
        document.getElementById("name").classList.add("border-red");
        valid = false;
    } else if (!isNaN(name)) {
        setError("uname", "Only characters are allowed.");
        document.getElementById("name").classList.add("border-red");
        valid = false;
    } else {
        setError("uname", "");
        document.getElementById("name").classList.remove("border-red");
    }

    if (address == "") {
        setError("uaddress", "Plese Enter Your Address");
        document.getElementById("address").classList.add("border-red");
        valid = false;
    } else {
        setError("uaddress", "");
        document.getElementById("address").classList.remove("border-red");
    }

    if (email == "") {
        setError("uemail", "Plese Enter Your Email");
        document.getElementById("email").classList.add("border-red");
        valid = false;
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
        setError("uemail", "Plese Enter Valid Email with character '@' ");
        document.getElementById("email").classList.add("border-red");
        valid = false;
    } else {
        setError("uemail", "");
        document.getElementById("email").classList.remove("border-red");
    }

    if (!(gender[0].checked || gender[1].checked)) {
        document.querySelector(".genderPara").innerHTML = "Select the gender";
        valid = false;
    } else {
        document.querySelector(".genderPara").innerHTML = "";
    }

    if (date == "") {
        setError("udate", "Plese Select Your Date");
        document.getElementById("date").classList.add("border-red");
        valid = false;
    } else {
        setError("udate", "");
        document.getElementById("date").classList.remove("border-red");
    }

    return valid;
};

const showData = () => {

    getUsers();

    for (let i = 0; i < users.length; i++) {
        document.getElementById("tbody").innerHTML += `<tr> 
        <td>${i + 1}</td>
        <td>${users[i].name}</td>
        <td>${users[i].address}</td>
        <td>${users[i].email}</td>
        <td>${users[i].gender}</td>
        <td>${users[i].date}</td>
        <td>
        <button class="btn btn-warning btn-sm edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateData(${i})">Edit</button>
        <button class="btn btn-danger btn-sm delete" onclick="deleteData(${i})">Delete</button>
        </td>
        </tr>`;
    }
};

document.onload = showData();

let mainForm = document.getElementById("main-form");
mainForm.addEventListener("submit", function (e) {
    e.preventDefault();
});

let allEmails = [];

const emailChecking = (email) => {

    getUsers();

    for (let i = 0; i < users.length; ++i) {
        allEmails.push(users[i].email);
    }

    let a = allEmails.includes(email);
    if (a) {
        alert("Email is already Exits try with another email");
    }
    return a;
};

const submitData = () => {
    if (!formValidate()) {
        return false;
    }

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let gender = getRadioValue();
    let date = document.getElementById("date").value;

    if (emailChecking(email)) {
        return false;
    }

    getUsers();

    users.push({
        name: name,
        address: address,
        email: email,
        gender: gender,
        date: date,
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Your Data is Submited successfully");

    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    document.getElementById("ugender").value = "";
    document.getElementById("date").value = "";

    location.reload();
    return true;
};

const deleteData = (index) => {
    if (!confirm("Are you sure to Delete This User")) {
        return;
    }

    getUsers();

    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
};

const updateData = (index) => {
    let submitBtn = document.getElementById("submit");
    let updateBtn = document.getElementById("update");
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    getUsers();

    document.getElementById("name").value = users[index].name;
    document.getElementById("address").value = users[index].address;
    document.getElementById("email").value = users[index].email;
    setRadioValue(users[index].gender);
    document.getElementById("date").value = users[index].date;

    document.querySelector("#update").onclick = function (e) {
        e.preventDefault();
        if (!formValidate()) {
            return false;
        }
        users[index].name = document.getElementById("name").value;
        users[index].address = document.getElementById("address").value;
        users[index].email = document.getElementById("email").value;
        users[index].gender = getRadioValue();
        users[index].date = document.getElementById("date").value;
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    };
};
