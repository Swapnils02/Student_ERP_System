function resetPassword() {
    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!email || !newPassword || !confirmPassword) {
        showToast("Please fill all fields", "error");
        return;
    }

    if (newPassword.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
        showToast("Email not found!", "error");
        return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    showToast("Password reset successfully!", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

function showToast(message, type) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    const toastIcon = document.getElementById("toast-icon");

    toastText.textContent = message;

    toast.classList.remove("success", "error", "warning");
    toast.classList.add("show", type);

    if (type === "success") toastIcon.className = "fas fa-check-circle";
    else if (type === "error") toastIcon.className = "fas fa-times-circle";
    else if (type === "warning") toastIcon.className = "fas fa-exclamation-triangle";

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

