document.addEventListener("DOMContentLoaded", () => {
    const student = JSON.parse(localStorage.getItem("loggedInUser"));
    const card = document.getElementById("hallticketCard");
    const printBtn = document.getElementById("printHallTicketBtn");

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    if (!student.examRegistration) {
        card.innerHTML = `
            <div class="not-available" style="
                text-align: center;
                padding: 50px;
                border-radius: 10px;
                background-color: linear-gradient(135deg, #667eea, #764ba2);
                color: #fff;
                font-size: 1.5rem;
                font-weight: 600;
            ">
                Hall Ticket Not Available<br>
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

    document.getElementById("htName").textContent = student.name;
    document.getElementById("htPrn").textContent = student.prn;
    document.getElementById("htCourse").textContent = student.course;
    document.getElementById("htClass").textContent = student.class;
    document.getElementById("htDivision").textContent = student.division;
    document.getElementById("htCenter").textContent = "Springfield High School";

    const tbody = document.getElementById("htSubjects");
    tbody.innerHTML = "";
    let examDate = new Date("2026-04-23");
    const gapDays = 2;

    function formatDate(date) {
        return `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
    }

    function skipWeekends(date) {
        const day = date.getDay();
        if(day === 6) date.setDate(date.getDate()+2);
        if(day === 0) date.setDate(date.getDate()+1);
        return date;
    }

    student.examRegistration.subjects.forEach(sub => {
        examDate = skipWeekends(examDate);
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${sub}</td><td>${formatDate(examDate)}</td><td>10:00 AM - 12:00 PM</td>`;
        tbody.appendChild(tr);
        examDate.setDate(examDate.getDate() + gapDays);
    });
});
