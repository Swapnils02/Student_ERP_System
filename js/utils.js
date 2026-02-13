function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

function openResult() { 
    window.open('result.html', '_blank'); 
}

function openHallTicket() { 
    window.open('hallticket.html', '_blank'); 
}

function openExamRegistration() { 
    window.open('examregister.html', '_blank'); 
}

function openPayFees() { 
    window.open('payfees.html', '_blank'); 
}

function openViewReceipt() {
    window.open('viewreceipt.html', '_blank'); 
}

function openFeeHistory() { 
    window.open('viewfeehistory.html', '_blank'); 
}

document.addEventListener("DOMContentLoaded", function () {
  setSidebarStudentName();
});

function setSidebarStudentName() {
  const student = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!student) {
    window.location.href = "login.html";
    return;
  }

  const nameElement = document.getElementById("studentName");

  if (nameElement) {
    nameElement.textContent = student.name || "Student";
  }
}

function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 2500);
}
