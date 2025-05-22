let editingTaskIndex = -1;

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function submitTask() {
  const title = document.getElementById('task-title').value.trim();
  const desc = document.getElementById('task-desc').value.trim();
  const timeFrom = document.getElementById('task-time-from').value;
  const timeTo = document.getElementById('task-time-to').value;
  const payment = document.getElementById('task-payment').value.trim();
  const location = document.getElementById('task-location').value.trim();
  const phone = document.getElementById('task-phone').value.trim();
  const pincode = document.getElementById('giver-pincode').value.trim();

  // Validation regex
  const nameRegex = /^[A-Za-z ]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;
  const paymentRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

  if (!title || !nameRegex.test(title)) {
    alert("Task title must contain only letters and spaces.");
    return;
  }

  if (!desc) {
    alert("Please enter a task description.");
    return;
  }

  if (!timeFrom || !timeTo) {
    alert("Please select both start and end time.");
    return;
  }

  if (!payment || !paymentRegex.test(payment)) {
    alert("Please enter a valid numeric payment.");
    return;
  }

  if (!location || !nameRegex.test(location)) {
    alert("Location must be a valid city or village name (letters and spaces only).");
    return;
  }

  if (!phone || !phoneRegex.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  if (!pincode || !pincodeRegex.test(pincode)) {
    alert("Pincode must be exactly 6 digits.");
    return;
  }

  const taskData = { title, desc, timeFrom, timeTo, payment, location, phone, pincode };
  const tasks = getTasks();

  if (editingTaskIndex >= 0) {
    tasks[editingTaskIndex] = taskData;
    editingTaskIndex = -1;
    alert("Task updated!");
  } else {
    tasks.push(taskData);
    alert("Task posted!");
  }

  saveTasks(tasks);
  clearTaskFields();
  renderGiverTasks();
}


function clearTaskFields() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-time-from').value = '';
  document.getElementById('task-time-to').value = '';
  document.getElementById('task-payment').value = '';
  document.getElementById('task-location').value = '';
  document.getElementById('task-phone').value = '';
  document.getElementById('giver-pincode').value = '';
}

function editTask(index) {
  const tasks = getTasks();
  const task = tasks[index];
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.desc;
  document.getElementById('task-time-from').value = task.timeFrom;
  document.getElementById('task-time-to').value = task.timeTo;
  document.getElementById('task-payment').value = task.payment;
  document.getElementById('task-location').value = task.location;
  document.getElementById('task-phone').value = task.phone;
  document.getElementById('giver-pincode').value = task.pincode;
  editingTaskIndex = index;
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderGiverTasks();
}

function renderGiverTasks() {
  const tasks = getTasks();
  const list = document.getElementById('task-list-giver');
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks posted yet.</p>";
    return;
  }

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <div class="card">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
        <p><strong>From:</strong> ${new Date(task.timeFrom).toLocaleString()}</p>
        <p><strong>To:</strong> ${new Date(task.timeTo).toLocaleString()}</p>
        <p><strong>Payment:</strong> ₹${task.payment}</p>
        <p><strong>Location:</strong> ${task.location}</p>
        <p><strong>Phone:</strong> ${task.phone}</p>
        <p><strong>Pincode:</strong> ${task.pincode}</p>
        <button class="edit-btn" onclick="editTask(${index})">✏️ Edit</button>
        <button onclick="deleteTask(${index})">🗑️ Delete</button>
      </div>
    `;
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", renderGiverTasks);