document.addEventListener("DOMContentLoaded", function () {
    const student = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!student) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("studentName").textContent = student.name || "";

    const subjectsByCourse = {
        Science: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
        Arts: ["History", "Political Science", "Geography", "Sociology", "English", "Psychology"],
        Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics", "English", "Statistics"]
    };
    const expectedSubjects = subjectsByCourse[student.course] || [];
    if (!student.attendanceData || student.lastCourse !== student.course ||
        Object.keys(student.attendanceData).length !== expectedSubjects.length) {
        const attendanceData = {};
        let totalPercent = 0;
        expectedSubjects.forEach(subject => {
            const percent = Math.floor(Math.random() * 41) + 60; 
            attendanceData[subject] = percent;
            totalPercent += percent;
        });
        student.attendanceData = attendanceData;
        student.overallAttendance = expectedSubjects.length > 0
            ? (totalPercent / expectedSubjects.length).toFixed(2)
            : "0.00";
        student.lastCourse = student.course;
        localStorage.setItem("loggedInUser", JSON.stringify(student));
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const index = users.findIndex(u => u.email === student.email);
        if (index !== -1) {
            users[index] = student;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
    displayAttendance(student);
    const overall = !isNaN(parseFloat(student.overallAttendance))
        ? student.overallAttendance
        : "0.00";
    document.getElementById("attendance").textContent = overall + "%";
    document.getElementById("percentage").textContent = overall + "%";
    document.getElementById("courseCard").textContent = student.course || "-";
});

function displayAttendance(student) {
    const grid = document.querySelector(".attendance-grid");
    if (!grid) return;
    grid.innerHTML = "";
    for (let [subject, percent] of Object.entries(student.attendanceData || {})) {
        const card = document.createElement("div");
        card.className = "attendance-card";
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.style.background = `conic-gradient(#667eea 0% ${percent}%, #764ba2 ${percent}% 100%)`;
        const span = document.createElement("span");
        span.textContent = percent + "%";
        circle.appendChild(span);
        const subj = document.createElement("div");
        subj.className = "subject";
        subj.textContent = subject;
        card.appendChild(circle);
        card.appendChild(subj);
        grid.appendChild(card);
    }

    const overallCircle = document.querySelector(".overall-circle");
    if (overallCircle) {
        const overallPercent = isNaN(parseFloat(student.overallAttendance))
            ? 0
            : parseFloat(student.overallAttendance);
        const overallSpan = overallCircle.querySelector("#overall-percent");
        if (overallSpan) overallSpan.textContent = overallPercent + "%";
        overallCircle.style.background =
            `conic-gradient(#667eea 0% ${overallPercent}%, #764ba2 ${overallPercent}% 100%)`;
    }
}
