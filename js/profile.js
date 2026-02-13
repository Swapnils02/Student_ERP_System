document.addEventListener("DOMContentLoaded", function () {
  loadProfile();
});

function loadProfile() {
  const student = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!student) {
    window.location.href = "login.html";
    return;
  }

  const sidebarName = document.getElementById("studentName");
  if (sidebarName) {
    sidebarName.innerText = student.name || "";
  }

  document.getElementById("profileFullName").innerText = student.name || "";
  document.getElementById("profilePRN").innerText = "PRN: " + (student.prn || "");

  const avatar = document.getElementById("profileInitial");
  if (avatar && student.name) {
    avatar.innerText = student.name.trim().charAt(0).toUpperCase();
  }

  document.getElementById("fullName").value = student.name || "";
  document.getElementById("email").value = student.email || "";
  document.getElementById("course").value = student.course || "";
  document.getElementById("dob").value = student.dob || "";
  document.getElementById("motherName").value = student.motherName || "";
  document.getElementById("phone").value = student.phone || "";
  document.getElementById("address").value = student.address || "";
  document.getElementById("division").value = student.division || "";
  document.getElementById("class").value = student.class || "";
  document.getElementById("feespaid").value = student.feespaid || "";
  document.getElementById("gender").value = student.gender || "";
}

function updateProfile() {
    let student = JSON.parse(localStorage.getItem("loggedInUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!student) return;

    const newCourse = document.getElementById("course").value;

    if (student.course !== newCourse) {
        student.resultData = null;
        student.attendanceData = null;
        student.overallAttendance = null;
    }

    student.course = newCourse;
    student.lastCourse = newCourse;

    student.dob = document.getElementById("dob").value;
    student.motherName = document.getElementById("motherName").value;
    student.phone = document.getElementById("phone").value;
    student.address = document.getElementById("address").value;
    student.division = document.getElementById("division").value;
    student.class = document.getElementById("class").value;
    student.feespaid = document.getElementById("feespaid").value;
    student.gender = document.getElementById("gender").value;
    
    if (!student.prn) {
        const prn = generatePRN(users, student.course, student.class, student.division);
        if (prn) student.prn = prn;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(student));
    const index = users.findIndex(user => user.email === student.email);
    if (index !== -1) {
        users[index] = student;
        localStorage.setItem("users", JSON.stringify(users));
    }

    showToast("Profile Updated Successfully!");

    setTimeout(() => {
        window.location.href = "student.html";
    }, 2000);
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    if (type === "success") {
        toast.innerHTML = `<i class="fas fa-check-circle"></i>${message}`;
    } else {
        toast.innerText = message;
    }

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 2500);
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
