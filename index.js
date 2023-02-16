let peopleList;

let d = new Date();
d.setDate(d.getDate() - 1);
document.getElementById("date").max = d.toISOString().split('T')[0];

const setError = (id, message) => {
    let ele = document.getElementById(id)
    ele.querySelector(".error").innerHTML = message;
}

const getRadioValue = () => {
    let radioBtn = document.getElementsByName("gender");
    let selected = Array.from(radioBtn).find(radio => radio.checked);
    return selected.value;
}

const setRadioValue = (gender) => {
    document.getElementById(gender).checked = true;

}

const formValidate = () => {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let gender = document.getElementsByName("gender")


    if (name == "") {
        setError("uname", "Plese Enter Your Name")
        document.getElementById("name").classList.add("border-red")
        return false;
    } else if ((name.length <= 2) || (name.length > 20)) {
        setError("uname", "Username must be between 2 to 20")
        document.getElementById("name").classList.add("border-red")
        return false;
    } else if (!isNaN(name)) {
        setError("uname", "Only characters are allowed.")
        document.getElementById("name").classList.add("border-red")
        return false;
    } else {
        setError("uname", "")
        document.getElementById("name").classList.remove("border-red")
    }


    if (address == '') {
        setError("uaddress", "Plese Enter Your Address")
        document.getElementById("address").classList.add("border-red")
        return false;
    } else {
        setError("uaddress", "")
        document.getElementById("address").classList.remove("border-red")
    }

    if (email == "") {
        setError("uemail", "Plese Enter Your Email")
        document.getElementById("email").classList.add("border-red")
        return false;
    } else if (!(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))) {
        setError("uemail", "Plese Enter Valid Email with character '@' ")
        document.getElementById("email").classList.add("border-red")
        return false;
    } else {
        setError("uemail", "")
        document.getElementById("email").classList.remove("border-red")
    }


    if (!(gender[0].checked || gender[1].checked)) {
        document.querySelector(".genderPara").innerHTML = "Select the gender";
        return false;
    } else {
        document.querySelector(".genderPara").innerHTML = "";
    }

    if (date == '') {
        setError("udate", "Plese Select Your Date")
        document.getElementById("date").classList.add("border-red")
        return false;
    } else {
        setError("udate", "")
        document.getElementById("date").classList.remove("border-red")
    }

    return true;
}



const showData = () => {
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    for (let i = 0; i < peopleList.length; i++) {
        document.getElementById("tbody").innerHTML +=
            `<tr> 
        <td>${i + 1}</td>
        <td>${peopleList[i].name}</td>
        <td>${peopleList[i].address}</td>
        <td>${peopleList[i].email}</td>
        <td>${peopleList[i].gender}</td>
        <td>${peopleList[i].date}</td>
        <td>
        <button class="btn btn-warning btn-sm edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateData(${i})">Edit</button>
        <button class="btn btn-danger btn-sm delete" onclick="deleteData(${i})">Delete</button>
        </td>
        </tr>`;
    }
};

document.onload = showData();

let mainForm = document.getElementById("main-form")
mainForm.addEventListener("submit", function (e) {
    e.preventDefault();
})

let allEmails = [];

const emailChecking = (email) => {
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    for (let i = 0; i < peopleList.length; ++i) {
        allEmails.push(peopleList[i].email);
    }

    let a = allEmails.includes(email);
    if(a){
        alert("Email is already Exits try with another email")
    }
    return a;

}

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
        return false
    }

    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
        name: name,
        address: address,
        email: email,
        gender: gender,
        date: date,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    alert("Your Data is Submited successfully")

    document.getElementById("name").value = '';
    document.getElementById("address").value = '';
    document.getElementById("email").value = '';
    document.getElementById("ugender").value = '';
    document.getElementById("date").value = '';

    location.reload();
    return true;
};

const deleteData = (index) => {

    if (!confirm("Are you sure to Delete This User")) {
        return;
    }

    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList))
    location.reload();
}

const updateData = (index) => {
    let submitBtn = document.getElementById("submit")
    let updateBtn = document.getElementById("update")
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")

    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;
    setRadioValue(peopleList[index].gender);
    document.getElementById("date").value = peopleList[index].date;

    document.querySelector("#update").onclick = function (e) {
        e.preventDefault();
        if (!formValidate()) {
            return false;
        }
        peopleList[index].name = document.getElementById("name").value
        peopleList[index].address = document.getElementById("address").value
        peopleList[index].email = document.getElementById("email").value
        peopleList[index].gender = getRadioValue();
        peopleList[index].date = document.getElementById("date").value
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        location.reload();
    }

}

