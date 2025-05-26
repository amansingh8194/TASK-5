function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  
  // Contact Form
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('confirmation').classList.remove('hidden');
    this.reset();
  });
  
  // To-Do
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  function addTask() {
    const task = document.getElementById('taskInput').value.trim();
    const due = document.getElementById('dueDate').value;
    if (task) {
      tasks.push({ task, due, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }
  
  function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  
  function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((t, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${t.task} - Due: ${t.due}</span>
        <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleCompletion(${i})"/>
      `;
      list.appendChild(li);
    });
  }
  
  renderTasks();
  
  // Product Listing
  const products = [
    { name: "Webcam", category: "tech", price: 49, rating: 4.2 },
    { name: "Keyboard", category: "tech", price: 29, rating: 4.5 },
    { name: "Eloquent JavaScript", category: "books", price: 15, rating: 4.7 },
    { name: "CSS Secrets", category: "books", price: 22, rating: 4.4 },
  ];
  
  function displayProducts(items) {
    const container = document.getElementById('productList');
    container.innerHTML = '';
    items.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${(p.price * 80).toFixed(0)}</p>
        <p>Rating: ⭐ ${p.rating}</p>
      `;
      container.appendChild(div);
    });
  }
  
  function filterProducts() {
    const cat = document.getElementById('categoryFilter').value;
    let filtered = cat === 'all' ? [...products] : products.filter(p => p.category === cat);
    sortProducts(filtered);
  }
  
  function sortProducts(list = products) {
    const sort = document.getElementById('sortOption').value;
    const sorted = [...list];
  
    if (sort === 'priceLow') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'priceHigh') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  
    displayProducts(sorted);
  }
  
  filterProducts();
  
  