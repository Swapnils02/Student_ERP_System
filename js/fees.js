 document.addEventListener("DOMContentLoaded", () => {
      const student = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!student) {
        window.location.href = "login.html";
        return;
      }

      document.getElementById("studentName").innerText = student.name || "";
      document.getElementById("studentInitial").innerText =
        student.name?.charAt(0).toUpperCase() || "";
        
      if (!student.feespaid) {
        student.feespaid = "No";
        localStorage.setItem("loggedInUser", JSON.stringify(student));
      }
    });