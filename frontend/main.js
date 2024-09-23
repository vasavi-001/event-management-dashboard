const eventList = document.getElementById('event-list');
const socket = io(); // Initialize Socket.IO for real-time updates

// Handle User Registration
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch('http://localhost:3002/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      // Close modal after registration
      const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      registerModal.hide();
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});

// Handle User Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:3002/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token); // Save token in local storage
      alert('Login successful!');
      // Close modal after login
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      loginModal.hide();
      loadEvents(); // Reload events to show registered events for logged-in user
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});


// Function to fetch and display events
const loadEvents = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/events');
    const events = await response.json();

    eventList.innerHTML = ''; // Clear any existing events

    events.forEach((event) => {
      const eventHtml = `
        <div class="col-md-4">
          <div class="card event-card">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
              <p><strong>Available Spots:</strong> ${event.maxRegistrations - event.registrations.length}</p>
              <button class="btn btn-primary" onclick="registerForEvent('${event._id}')">Register</button>
            </div>
          </div>
        </div>
      `;
      eventList.insertAdjacentHTML('beforeend', eventHtml);
    });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

// Function to register for an event
const registerForEvent = async (eventId) => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage after login
    const response = await fetch(`http://localhost:3002/api/events/register/${eventId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      loadEvents(); // Reload events to reflect the updated registration count
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error registering for event:', error);
  }
};

// Listen for real-time updates on registrations
socket.on('registrationUpdate', ({ eventId, registrations }) => {
  console.log(`Event ${eventId} has now ${registrations} registrations`);
  loadEvents(); // Reload events to reflect real-time updates
});

// Handle User Registration
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch('http://localhost:3002/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      // Close modal after registration
      const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      registerModal.hide();
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});

// Handle User Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:3002/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token); // Save token in local storage
      alert('Login successful!');
      // Close modal after login
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      loginModal.hide();
      loadEvents(); // Reload events to show registered events for logged-in user
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});

// Function to load events
const loadEvents = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/events');
    const events = await response.json();

    eventList.innerHTML = ''; // Clear any existing events

    events.forEach((event) => {
      const eventHtml = `
        <div class="col-md-4">
          <div class="card event-card">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
              <p><strong>Available Spots:</strong> ${event.maxRegistrations - event.registrations.length}</p>
              <button class="btn btn-primary" onclick="registerForEvent('${event._id}')">Register</button>
            </div>
          </div>
        </div>
      `;
      eventList.insertAdjacentHTML('beforeend', eventHtml);
    });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

// Function to register for an event
const registerForEvent = async (eventId) => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage after login
    const response = await fetch(`http://localhost:3002/api/events/register/${eventId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      loadEvents(); // Reload events to reflect the updated registration count
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error('Error registering for event:', error);
  }
};

// Listen for real-time updates on registrations
socket.on('registrationUpdate', ({ eventId, registrations }) => {
  console.log(`Event ${eventId} has now ${registrations} registrations`);
  loadEvents(); // Reload events to reflect real-time updates
});

// Open modals on link click
document.getElementById('login').addEventListener('click', () => {
  const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  loginModal.show();
});

document.getElementById('register').addEventListener('click', () => {
  const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
  registerModal.show();
});

// Initially load events when the page loads
window.onload = loadEvents;


