function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function getVolunteers() {
  return JSON.parse(localStorage.getItem('volunteers') || '[]');
}

function saveVolunteers(volunteers) {
  localStorage.setItem('volunteers', JSON.stringify(volunteers));
}

function submitVolunteer() {
  const name = document.getElementById('vol-name').value.trim();
  const phone = document.getElementById('vol-phone').value.trim();
  const pincode = document.getElementById('vol-pincode').value.trim();

  // Validation rules
  const nameRegex = /^[A-Za-z ]+$/;
  const phoneRegex = /^\d{10}$/;
  const pincodeRegex = /^\d{6}$/;

  if (!name || !phone || !pincode) {
    alert("Please fill all fields!");
    return;
  }

  if (!nameRegex.test(name)) {
    alert("Name must contain only alphabets and spaces.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  if (!pincodeRegex.test(pincode)) {
    alert("Pincode must be a 6-digit number.");
    return;
  }

  const volunteers = getVolunteers();
  volunteers.push({ name, phone, pincode });
  saveVolunteers(volunteers);
  alert("Volunteer profile submitted!");
  renderVolunteerTasks();
}

function renderVolunteerTasks() {
  const volunteers = getVolunteers();
  const tasks = getTasks();
  const latestVolunteer = volunteers[volunteers.length - 1];
  const list = document.getElementById('task-list-volunteer');
  list.innerHTML = '';

  if (!latestVolunteer) {
    list.innerHTML = "<p>Please submit your volunteer profile first.</p>";
    return;
  }

  const matchedTasks = tasks.filter(task => task.pincode === latestVolunteer.pincode);
  if (matchedTasks.length === 0) {
    list.innerHTML = "<p>No matching tasks for your pincode.</p>";
    return;
  }

  matchedTasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <p class="card-title">${task.title}</p>
          <p>${task.desc}</p>
          <p><strong>Time:</strong> ${task.timeFrom} - ${task.timeTo}</p>
          <p><strong>Pay:</strong> ${task.payment}</p>
        </div>
        <div class="card-back">
          <p><strong>Location:</strong><br>${task.location}</p>
          <p><strong>Phone:</strong><br>${task.phone}</p>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}