document.addEventListener("DOMContentLoaded", () => {

    const student = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    const receiptCard = document.getElementById("receiptCard");
    const feesNotPaidCard = document.getElementById("feesNotPaidCard");

    if (student.feespaid !== "Yes" || !student.latestReceipt) {
        receiptCard.style.display = "none";
        feesNotPaidCard.style.display = "block";
        return;
    }

    feesNotPaidCard.style.display = "none";
    receiptCard.style.display = "block";

    const txn = student.latestReceipt;

    document.getElementById("studentName").textContent = student.name;
    document.getElementById("studentPrn").textContent = student.prn;
    document.getElementById("studentCourse").textContent = student.course;
    document.getElementById("studentDivision").textContent = student.division;

    document.getElementById("paymentDate").textContent = txn.date;
    document.getElementById("receiptNo").textContent = txn.receiptNo;

    document.getElementById("tuitionFee").textContent = txn.tuition.toLocaleString("en-IN");
    document.getElementById("labFee").textContent = txn.lab.toLocaleString("en-IN");
    document.getElementById("libraryFee").textContent = txn.library.toLocaleString("en-IN");
    document.getElementById("totalPaid").textContent = txn.amount.toLocaleString("en-IN");
});
