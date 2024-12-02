// Users and Roles Data
const users = [];
const roles = [
  { role: "Admin", permissions: ["Read", "Write", "Delete"] },
  { role: "Editor", permissions: ["Read", "Write"] },
  { role: "Viewer", permissions: ["Read"] },
];

// Create random names
const randomNames = [
  "Sanyukta Joshi", "Shifa Shaikh", "Aarav Sharma", "Aadhya Gupta", "Ananya Patel", "Arjun Reddy", 
  "Ayush Verma", "Bhavana Rao", "Chirag Mehta", "Daksha Iyer", "Divya Singh", "Gautam Kapoor", 
  "Harshita Agarwal", "Ishaan Desai", "Jaya Nair", "Kabir Kumar", "Kiran Yadav", "Lavanya Soni", 
  "Manav Joshi", "Meera Choudhury", "Mohan Singh", "Nandini Rathi", "Neel Patel", "Omkar Shukla", 
  "Pooja Verma", "Rahul Mishra", "Ritu Bansal", "Rohan Thakur", "Shruti Sharma", "Tanvi Gupta", 
  "Varun Rao", "Vidya Shah", "Sanya Jain", "Anil Kumar"
];


// Populate Users with Random Names
for (let i = 0; i < 30; i++) {
  users.push({
    username: randomNames[i],
    role: i % 2 === 0 ? "Admin" : "Editor",
    status: i % 3 === 0 ? "Active" : "Inactive"
  });
}

// Render Users
function renderUsers() {
  const userTable = document.getElementById("user-table");
  userTable.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.role}</td>
      <td style="color: ${user.status === "Active" ? "green" : "black"}">${user.status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// Render Roles
function renderRoles() {
  const roleTable = document.getElementById("role-table");
  roleTable.innerHTML = "";
  roles.forEach((role, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${role.role}</td>
      <td>${role.permissions.join(", ")}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editRole(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRole(${index})">Delete</button>
      </td>
    `;
    roleTable.appendChild(row);
  });
}

// Add User
document.getElementById("add-user-btn").addEventListener("click", () => {
  const username = prompt("Enter username:");
  const role = prompt("Enter role:");
  const status = "Active";
  if (username && role) {
    users.push({ username, role, status });
    renderUsers();
  }
});

// Add Role
document.getElementById("add-role-btn").addEventListener("click", () => {
  const role = prompt("Enter role:");
  const permissions = prompt("Enter permissions (comma-separated):").split(",");
  if (role && permissions) {
    roles.push({ role, permissions });
    renderRoles();
  }
});

// Password verification
function verifyPassword(callback) {
  const password = prompt("Enter password to confirm action:");
  if (password === "admin123") {
    callback();
  } else {
    alert("Incorrect password!");
  }
}

// Delete User
function deleteUser(index) {
  verifyPassword(() => {
    users.splice(index, 1);
    renderUsers();
  });
}

// Delete Role
function deleteRole(index) {
  verifyPassword(() => {
    roles.splice(index, 1);
    renderRoles();
  });
}

// Edit User
function editUser(index) {
  verifyPassword(() => {
    const username = prompt("Edit username:", users[index].username);
    const role = prompt("Edit role:", users[index].role);
    if (username && role) {
      users[index] = { ...users[index], username, role };
      renderUsers();
    }
  });
}

// Edit Role
function editRole(index) {
  verifyPassword(() => {
    const role = prompt("Edit role:", roles[index].role);
    const permissions = prompt("Edit permissions:", roles[index].permissions.join(",")).split(",");
    if (role && permissions) {
      roles[index] = { role, permissions };
      renderRoles();
    }
  });
}

// Initial Render
renderUsers();
renderRoles();
