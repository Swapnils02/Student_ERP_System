document.addEventListener("DOMContentLoaded", () => {
    const student = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!student) {
        window.location.href = "login.html";
        return;
    }

    const resultCard = document.querySelector(".result-card");
    const printBtn = document.getElementById("printResultBtn");

    if (!student.examRegistration || !student.resultData) {
        resultCard.innerHTML = `
            <div class="not-available" style="text-align:center; padding:40px;">
                <h2>Result Not Declared Yet</h2>
            </div>
        `;

        if (printBtn) {
            printBtn.style.display = "none";
        }

        return;
    }

    if (printBtn) {
        printBtn.style.display = "inline-block";
    }

    document.getElementById("resultFullName").textContent = student.name || "-";
    document.getElementById("resultPRN").textContent = student.prn || "-";
    document.getElementById("resultClassDiv").textContent =
        `${student.class || "-"} - ${student.division || "-"}`;
    document.getElementById("resultDOB").textContent = student.dob || "-";
    document.getElementById("resultMotherName").textContent = student.motherName || "-";
    document.getElementById("resultCourse").textContent = student.course || "-";

    const tableBody = document.querySelector(".marks-table tbody");
    tableBody.innerHTML = "";

    let totalMarks = 0;
    const subjects = Object.keys(student.resultData);

    subjects.forEach((sub, i) => {
        const marks = Number(student.resultData[sub]) || 0;
        totalMarks += marks;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${sub}</td>
            <td>100</td>
            <td>${marks}</td>
            <td>${calculateGrade(marks)}</td>
        `;
        tableBody.appendChild(row);
    });

    const maxTotal = subjects.length * 100;
    const percentage = ((totalMarks / maxTotal) * 100).toFixed(2);
    const resultStatus = percentage >= 35 ? "Pass" : "Fail";

    document.getElementById("resultTotal").textContent =
        `${totalMarks} / ${maxTotal}`;
    document.getElementById("resultPercentage").textContent =
        `${percentage}%`;

    const statusEl = document.getElementById("resultStatus");
    statusEl.textContent = resultStatus;
    statusEl.style.color = resultStatus === "Fail" ? "red" : "green";
    
    student.totalMarks = totalMarks;
    student.percentage = percentage;
    student.resultStatus = resultStatus;
    updateLoggedInUser(student);
});

function calculateGrade(marks) {
    if (marks >= 90) return "O";
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "B+";
    if (marks >= 50) return "B";
    if (marks >= 35) return "P";
    return "F";
}
