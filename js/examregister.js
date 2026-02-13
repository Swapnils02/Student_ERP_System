document.addEventListener("DOMContentLoaded", () => {
    const student = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!student) {
        window.location.href = "login.html";
        return;
    }

    const form = document.querySelector("form");
    if (!form) return; 

    const nameInput = form.querySelector("input[placeholder*='name']");
    const prnInput = form.querySelector("input[placeholder*='PRN']");
    const classSelect = form.querySelector("select:nth-of-type(1)");
    const courseSelect = form.querySelector("#course");

    if (nameInput) {
        nameInput.value = student.name || "";
        nameInput.readOnly = true;
    }

    if (prnInput) {
        prnInput.value = student.prn || "";
        prnInput.readOnly = true;
    }

    if (classSelect) {
        classSelect.value = student.class || "";
        classSelect.disabled = true;
    }

    if (courseSelect) {
        courseSelect.value = student.course || "";
        courseSelect.disabled = true;
    }

    const subjectsByCourse = {
        Science: ["Mathematics","Physics","Chemistry","Biology","English","Computer Science"],
        Arts: ["History","Political Science","Geography","Sociology","English","Psychology"],
        Commerce: ["Accountancy","Business Studies","Economics","Mathematics","English","Statistics"]
    };

    const subjects = subjectsByCourse[student.course] || [];
    const subjectSelect = document.querySelector("#subject");

    if (subjectSelect) {
        subjectSelect.innerHTML = "";
        subjects.forEach(sub => {
            const opt = document.createElement("option");
            opt.value = sub;
            opt.textContent = sub;
            subjectSelect.appendChild(opt);
        });
        subjectSelect.disabled = true;
    }

    const examSelect = document.getElementById("examType");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!examSelect || !examSelect.value) {
            showToast("Please select an exam", "error");
            return;
        }

        let currentStudent = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!currentStudent) {
            showToast("Session expired", "error");
            return;
        }

        if (
            currentStudent.examRegistration &&
            currentStudent.examRegistration.examType === examSelect.value
        ) {
            showToast("Already registered for this exam", "error");
            return;
        }

        currentStudent.examRegistration = {
            examType: examSelect.value,
            subjects,
            dateRegistered: new Date().toLocaleDateString("en-IN")
        };

        const resultData = {};
        subjects.forEach(sub => {
            resultData[sub] = Math.floor(Math.random() * 51) + 50;
        });
        currentStudent.resultData = resultData;

        updateLoggedInUser(currentStudent);

        showToast("Exam Registered Successfully!", "success");

        setTimeout(() => {
            window.location.href = "result.html";
        }, 1500);
    });
});
