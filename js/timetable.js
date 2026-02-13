document.addEventListener("DOMContentLoaded", function () {

  const student = JSON.parse(localStorage.getItem("loggedInUser"));
  const course = student ? student.course : null;

  const timetableData = {
    Science: [
      ["Math", "Physics", "Chemistry", "Computer", "English"],
      ["Computer", "English", "Physics", "Chemistry", "Math"],
      ["Physics", "Chemistry", "Math", "Biology", "Computer"],
      ["Break", "Break", "Break", "Break", "Break"],
      ["Biology", "English", "Computer", "Math", "Physics"],
      ["Chemistry", "Biology", "Math", "English", "Computer"],
      ["Physics", "Chemistry", "English", "Math", "Biology"]
    ],

    Arts: [
      ["History", "Political Sci", "Geography", "English", "Sociology"],
      ["English", "History", "Political Sci", "Geography", "Sociology"],
      ["Geography", "Sociology", "History", "English", "Political Sci"],
      ["Break", "Break", "Break", "Break", "Break"],
      ["Political Sci", "English", "History", "Geography", "Sociology"],
      ["Sociology", "History", "English", "Political Sci", "Geography"],
      ["English", "Geography", "Sociology", "History", "Political Sci"]
    ],

    Commerce: [
      ["Accountancy", "Business", "Economics", "Math", "English"],
      ["Business", "English", "Economics", "Accountancy", "Math"],
      ["Economics", "Accountancy", "Business", "English", "Math"],
      ["Break", "Break", "Break", "Break", "Break"],
      ["Math", "Economics", "Business", "Accountancy", "English"],
      ["Accountancy", "Business", "Math", "Economics", "English"],
      ["Business", "Math", "English", "Accountancy", "Economics"]
    ]
  };

  const timeSlots = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
    "2:00 - 3:00",
    "3:00 - 4:00"
  ];

  const tableBody = document.getElementById("timetableBody");
  tableBody.innerHTML = ""; 

  if (!course || !timetableData[course]) {
    tableBody.innerHTML =
      "<tr><td colspan='6'>No timetable available for your course</td></tr>";
    return;
  }

  timetableData[course].forEach((row, index) => {
    const tr = document.createElement("tr");

    const timeCell = document.createElement("td");
    timeCell.textContent = timeSlots[index];
    tr.appendChild(timeCell);

    row.forEach(subject => {
      const td = document.createElement("td");
      td.textContent = subject;
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });

});
