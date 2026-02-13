document.addEventListener("DOMContentLoaded", function () {
    loadStudentDashboard();
});

function loadStudentDashboard() {
    const student = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!student) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("studentName").innerText = student.name || "";

    document.getElementById("courseCard").innerText = student.course || "-";

document.getElementById("attendance").innerText =
  (Number(student.overallAttendance) || 0) + "%";

document.getElementById("percentage").innerText =
  (Number(student.percentage) || 0) + "%";

    document.getElementById("fullName").innerText = student.name || "";
    document.getElementById("email").innerText = student.email || "";
    document.getElementById("prn").innerText = student.prn || "";
    document.getElementById("feespaid").innerText = student.feespaid || "";
    document.getElementById("motherName").innerText = student.motherName || "";
    document.getElementById("division").innerText = student.division || "";
    document.getElementById("course").innerText = student.course || "";
    document.getElementById("class").innerText = student.class || "";
    document.getElementById("gender").innerText = student.gender || "";
    document.getElementById("phone").innerText = student.phone || "";
    document.getElementById("dob").innerText = student.dob || "";
    document.getElementById("address").innerText = student.address || "";
}
