document.addEventListener("DOMContentLoaded", () => {

    let student = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("studentName").textContent = student.name || "-";
    document.getElementById("studentPrn").textContent = student.prn || "-";
    document.getElementById("studentCourse").textContent = student.course || "-";
    document.getElementById("studentDivision").textContent = student.division || "-";

    const tableBody = document.getElementById("feeHistoryBody");
    const noTransactionMsg = document.getElementById("noTransactionMsg");

    if (student.feespaid !== "Yes" || !student.transactions) {
        noTransactionMsg.style.display = "block";
        tableBody.innerHTML = "";
        return;
    }

    const uniqueMap = {};
    student.transactions.forEach(txn => {
        uniqueMap[txn.receiptNo] = txn;
    });
    const uniqueTransactions = Object.values(uniqueMap);

    student.transactions = uniqueTransactions;
    localStorage.setItem("loggedInUser", JSON.stringify(student));

    if (uniqueTransactions.length === 0) {
        noTransactionMsg.style.display = "block";
        tableBody.innerHTML = "";
        return;
    }

    noTransactionMsg.style.display = "none";
    tableBody.innerHTML = "";

    uniqueTransactions.reverse().forEach(txn => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${txn.receiptNo}</td>
            <td>${txn.date}</td>
            <td>${txn.paymentMethod || "-"}</td> <!-- Use paymentMethod instead of description -->
            <td>${txn.amount.toLocaleString("en-IN")}</td>
            <td style="color:green;font-weight:bold;">${txn.status}</td>
        `;

        tableBody.appendChild(row);
    });

});
