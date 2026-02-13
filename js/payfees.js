
    function showToast(message, type = "success") {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("show"), 100);

      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 500);
      }, 2500);
    }

    document.addEventListener("DOMContentLoaded", () => {

      const student = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!student) {
        window.location.href = "login.html";
        return;
      }

      const tuition = 50000;
      const lab = 5000;
      const library = 2000;
      const total = tuition + lab + library;

      document.getElementById("studentName").value = student.name || "";
      document.getElementById("studentPRN").value = student.prn || "";
      document.getElementById("amount").value = total;

      document.getElementById("paymentForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const method = document.getElementById("paymentMethod").value;
        if (!method) {
          showToast("Please select payment method", "error");
          return;
        }

        const receiptNo = "RCPT" + Date.now();
        const date = new Date().toLocaleDateString("en-IN");

        const transaction = {
          receiptNo: receiptNo,
          date: date,
          description: "Tuition + Lab + Library",
          amount: total,
          status: "Paid",
          paymentMethod: method,
          tuition: tuition,
          lab: lab,
          library: library
        };

        if (!student.transactions) student.transactions = [];

        const exists = student.transactions.find(txn => txn.receiptNo === receiptNo);
        if (!exists) student.transactions.push(transaction);

        student.latestReceipt = transaction;
        student.feespaid = "Yes";

        localStorage.setItem("loggedInUser", JSON.stringify(student));

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const index = users.findIndex(u => u.email === student.email);
        if (index !== -1) {
          users[index] = student;
          localStorage.setItem("users", JSON.stringify(users));
        }

        showToast("Payment Successful!", "success");
        setTimeout(() => window.location.href = "viewreceipt.html", 2600);
      });

    });
