let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
displayTickets();

/* CREATE TICKET */
function addTicket() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let assign = document.getElementById("assign").value;
  let priority = document.getElementById("priority").value;

  if (title === "" || assign === "") {
    alert("Title and Assign To are required");
    return;
  }

  let ticket = {
    title,
    desc,
    assign,
    priority,
    status: "Open",
    createdAt: new Date().toLocaleString()
  };

  tickets.push(ticket);
  save();
  displayTickets();

  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("assign").value = "";
}

/* DISPLAY */
function displayTickets() {
  let list = document.getElementById("ticketList");
  list.innerHTML = "";

  if (tickets.length === 0) {
    list.innerHTML = "<p>No tickets created yet</p>";
    updateSummary();
    return;
  }

  tickets.forEach((t, index) => {
    let statusClass =
      t.status === "Open" ? "status-open" :
      t.status === "In Process" ? "status-process" :
      "status-closed";

    let div = document.createElement("div");
    div.className = "ticket";

    div.innerHTML = `
      <p><b>Title:</b> ${t.title}</p>
      <p><b>Description:</b> ${t.desc}</p>
      <p><b>Assigned To:</b> ${t.assign}</p>
      <p><b>Priority:</b> <span class="${t.priority.toLowerCase()}">${t.priority}</span></p>
      <p><b>Status:</b> <span class="${statusClass}">${t.status}</span></p>
      <p><b>Created On:</b> ${t.createdAt}</p>

      <button class="change-status" onclick="changeStatus(${index})">Change Status</button>
      <button class="delete-btn" onclick="deleteTicket(${index})">Delete</button>
    `;

    list.appendChild(div);
  });

  updateSummary();
}

/* CHANGE STATUS */
function changeStatus(index) {
  if (tickets[index].status === "Open")
    tickets[index].status = "In Process";
  else if (tickets[index].status === "In Process")
    tickets[index].status = "Closed";
  else
    tickets[index].status = "Open";

  save();
  displayTickets();
}

/* DELETE */
function deleteTicket(index) {
  if (confirm("Are you sure you want to delete this ticket?")) {
    tickets.splice(index, 1);
    save();
    displayTickets();
  }
}

/* SEARCH */
function searchTicket() {
  let text = document.getElementById("search").value.toLowerCase();
  let list = document.getElementById("ticketList");
  list.innerHTML = "";

  tickets
    .filter(t => t.title.toLowerCase().includes(text))
    .forEach((t, index) => {
      let div = document.createElement("div");
      div.className = "ticket";
      div.innerHTML = `<p><b>${t.title}</b></p>`;
      list.appendChild(div);
    });
}

/* STATUS SUMMARY */
function updateSummary() {
  let open = 0, process = 0, closed = 0;

  tickets.forEach(t => {
    if (t.status === "Open") open++;
    else if (t.status === "In Process") process++;
    else closed++;
  });

  document.getElementById("statusSummary").innerText =
    `Open: ${open} | In Process: ${process} | Closed: ${closed}`;
}

/* SAVE */
function save() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}
