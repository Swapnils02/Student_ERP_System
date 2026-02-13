function generatePRN(users, course, classNo, division) {
    if (!course || !classNo || !division) return null;

    const courseLetter = course.charAt(0).toUpperCase();
    const classNumber = classNo;
    const divisionLetter = division.toUpperCase();
    const currYear = new Date().getFullYear();

    const filteredUsers = users.filter(user =>
        user.course === course &&
        user.class === classNo &&
        user.division === division
    );

    const serial = filteredUsers.length + 1;

    if (serial > 50) {
        alert("Maximum 50 students allowed in this division!");
        return null;
    }

    const paddedSerial = serial.toString().padStart(2, "0");

    return `${courseLetter}${currYear}${divisionLetter}${classNumber}${paddedSerial}`;
}

function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        showToast("All fields are required!", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        showToast("Email already registered!", "error");
        return;
    }

    const newUser = {
        name,
        email,
        password,
        dob: "",
        motherName: "",
        course: "",
        division: "",
        section: "",
        class: "",
        phone: "",
        address: "",
        gender: "",
        feespaid: "",
        percentage: "",
        attendance: "",
        prn: "",
        examRegistration: null,
        resultData: null,
        totalMarks: null,
        resultStatus: null
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showToast("Signup successful! Redirecting...", "success");
    setTimeout(() => { window.location.href = "login.html"; }, 2000);
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === email && u.password === password);

    if (index !== -1) {
        const validUser = users[index]; 
        updateLoggedInUser(validUser);
        showToast("Login successful!", "success");
        setTimeout(() => { window.location.href = "student.html"; }, 1000);
    } else {
        showToast("Invalid email or password!", "error");
    }
}

function updateLoggedInUser(student) {
    localStorage.setItem("loggedInUser", JSON.stringify(student));

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === student.email);
    if (index !== -1) {
        users[index] = student;
        localStorage.setItem("users", JSON.stringify(users));
    }
}

function showToast(message, type="info") {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    const toastIcon = document.getElementById("toast-icon");
    if (!toast) return;

    toastText.textContent = message;
    toast.className = `toast show ${type}`;
    if (type === "success") toastIcon.className = "fas fa-check-circle";
    else if (type === "error") toastIcon.className = "fas fa-times-circle";
    else if (type === "warning") toastIcon.className = "fas fa-exclamation-triangle";

    setTimeout(() => toast.classList.remove("show"), 3000);
}
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    const nameEl = document.getElementById("studentName");
    if (nameEl) nameEl.textContent = user.name;

    const avatarEl = document.getElementById("studentInitial");
    if (avatarEl && user.name) avatarEl.textContent = user.name.trim().charAt(0).toUpperCase();
});
