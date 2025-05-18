// Ambil elemen yang dibutuhkan
const taskTableBody = document.getElementById('taskTableBody');
const searchInput = document.getElementById('searchInput');
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDateInput = document.getElementById('taskDate');
const taskStatusInput = document.getElementById('taskStatus');
const editIndexInput = document.getElementById('editIndex');

// Variabel untuk kategori aktif
let activeCategory = 'all';

// Array untuk menyimpan data tugas, diambil dari localStorage atau array kosong
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Menampilkan tugas di tabel berdasarkan kategori aktif dan query pencarian
function displayTasks(searchQuery = '') {
  const filteredTasks = tasks.filter(task => 
    (activeCategory === 'all' || task.category === activeCategory) &&
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  taskTableBody.innerHTML = ''; // Clear current table

  filteredTasks.forEach((task, index) => {
    const statusClass = task.status === 'Selesai' ? 'badge bg-success' : 'badge bg-warning';
    const taskRow = document.createElement('tr');
    taskRow.innerHTML = `
      <td>${task.name}</td>
      <td>${task.category}</td>
      <td>${task.date}</td>
      <td><span class="${statusClass}">${task.status}</span></td>
      <td>
        <button class="btn btn-info btn-sm" onclick="openEditForm(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Hapus</button>
      </td>
    `;
    taskTableBody.appendChild(taskRow);
  });
}

// Menambahkan atau mengedit tugas
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskName = taskNameInput.value.trim();
  const taskCategory = taskDescriptionInput.value.trim();
  const taskDate = taskDateInput.value.trim();
  const taskStatus = taskStatusInput.value.trim();

  if (taskName && taskCategory && taskDate) {
    const task = {
      name: taskName,
      category: taskCategory,
      date: taskDate,
      status: taskStatus,
    };

    const index = editIndexInput.value;
    if (index === '') {
      // Tambah tugas baru
      tasks.push(task);
    } else {
      // Edit tugas yang ada
      tasks[index] = task;
    }

    // Simpan ke localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    resetForm();

    // Tutup modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskFormModal'));
    modal.hide();
  }
});

// Mengedit tugas
function openEditForm(index) {
  const task = tasks[index];
  taskNameInput.value = task.name;
  taskDescriptionInput.value = task.category;
  taskDateInput.value = task.date;
  taskStatusInput.value = task.status;
  editIndexInput.value = index;

  const myModal = new bootstrap.Modal(document.getElementById('taskFormModal'));
  myModal.show();
}

// Menghapus tugas dengan validasi konfirmasi
function deleteTask(index) {
  const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus tugas ini?");
  if (confirmDelete) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  }
}

// Mencari tugas berdasarkan nama
searchInput.addEventListener('keyup', () => {
  const searchQuery = searchInput.value.trim();
  displayTasks(searchQuery);
});

// Reset form setelah simpan
function resetForm() {
  taskForm.reset();
  editIndexInput.value = '';
}

// Fungsi untuk memilih kategori di navbar
document.querySelectorAll('.list-group-item a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    activeCategory = e.target.getAttribute('data-filter');
    displayTasks();
  });
});

// Menampilkan semua tugas pada halaman awal
window.onload = () => displayTasks();
