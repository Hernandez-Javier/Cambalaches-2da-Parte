const container = document.querySelector('.categories');//cambalaches
const container_dash = document.querySelector('.dashboard_items');//products in dashboard
const container_categories = document.querySelector('.dashboard_categories');//categories in dashboard
const container_categories_index = document.querySelector('.categories_index');//categories in index
const container_last_products = document.querySelector('.last_products');//last products in index
(()=>{
  if (container_dash) {
    container_dash.addEventListener('click', delegate);
  }
  if (container) {
    container.addEventListener('click', delegate);
  }
  if (container_categories) {
    container_categories.addEventListener('click', delegate);
  }
  if (container_categories_index) {
    container_categories_index.addEventListener('click', delegate);
  }
  if (container_last_products) {
    container_last_products.addEventListener('click', delegate);
  }
})();

function delegate(e) {
  let productsDb = JSON.parse(localStorage.getItem('products'));
  let categories = JSON.parse(localStorage.getItem('categories'));
  e.preventDefault();
  console.log('ygyggygggygygyg');
  if (e.target.classList[0] == 'edit_button') {
    localStorage.setItem('product_edit', JSON.stringify(productsDb.find(item => item.id == e.target.id)));
    window.location.href = './new_product.html';
  }else if (e.target.classList[0] == 'micar_button_delete'){
    delete_product(e.target.id);
  }else if (e.target.classList[0] == 'center_text_cat'){
    localStorage.setItem('category_used', JSON.stringify(e.target.textContent));
    window.location.href = './cambalache.html';
  }else if (e.target.classList[0] == 'edit_button_cat'){
    console.log('aber');
    localStorage.setItem('category_edit', JSON.stringify(categories.find(item => item.id == e.target.id)));
    window.location.href = './new_category.html';
  }else{
    localStorage.setItem('view_product', JSON.stringify(productsDb.find(item => item.id == e.target.id)));
    let test = JSON.parse(localStorage.getItem('view_product'));
    if (test != null) {
      window.location.href = './products.html';
    }
  }
}

function addUser(){
  let loged = JSON.parse(localStorage.getItem('user_loged'))
  if (loged) {
    window.localStorage.removeItem('user_loged');
  }

  const Name = $('#name').val();
  const Lastname = $('#last_name').val();
  const Direction = $('#direction').val();
  const Direction2 = $('#direction2').val();
  //const Country = $('#country').val();
  const City = $('#city').val();
  const Email = $('#email').val();
  const Pass = $('#pass').val();

  //insert to a database
  let usersDb = JSON.parse(localStorage.getItem('users'));
  if(!usersDb) {
    usersDb = [];
  }

  for (let i=0; i<usersDb.length; i++) {
    if (usersDb[i].email == Email) {
      alert("Ese correo eectrónico ya se encuentra registrado");
      return false;
    }
  }

  let Country = $('#country :selected').text();

  const user = {
    name: Name,
    lastname: Lastname,
    direction: Direction,
    direction2: Direction2,
    country: Country,
    city: City,
    email: Email,
    pass: Pass,
    id: usersDb.length + 1
  }
  usersDb.push(user);
  localStorage.setItem('users', JSON.stringify(usersDb));
  localStorage.setItem('user_loged', JSON.stringify(user));
  window.location.href = 'dashboard.html';
}

function login() {
  const Email = $('#email').val();
  const Pass = $('#pass').val();

  let usersDb = JSON.parse(localStorage.getItem('users'));
  let loged = 0;

  if (!usersDb) {
    alert("Los datos ingresados son incorrectos");
    return false;
  }

  for (let i=0; i<usersDb.length; i++) {
      if (Email == usersDb[i].email && Pass == usersDb[i].pass) {
          localStorage.setItem('user_loged', JSON.stringify(usersDb[i]));
          window.location.href = 'dashboard.html';
          loged = 1;
      }
  }
  if (loged == 0){
      alert("Los datos ingresados son incorrectos");
  }
}

function new_category() {
  let categoriesDb = JSON.parse(localStorage.getItem('categories'));
  let category_edit = JSON.parse(localStorage.getItem('category_edit'));

  if (category_edit != null) {
    let index = categoriesDb.findIndex(item => item.id == category_edit.id);
    categoriesDb[index].name = $('#name').val();
    categoriesDb[index].description = $('#description').val();
    categoriesDb[index].image = $('#image').val();

    localStorage.setItem('categories', JSON.stringify(categoriesDb));
    window.localStorage.removeItem('category_edit');
    window.location.href = './dashboard.html';
    return false;
  }

  const Name = $('#name').val();
  const Description = $('#description').val();
  const Image = $('#image').val();
  const Owner = JSON.parse(localStorage.getItem('user_loged')).id;

  //insert to a database
  if(!categoriesDb) {
    categoriesDb = [];
  }

  const category = {
    name: Name,
    description: Description,
    image: Image,
    owner: Owner,
    id: categoriesDb.length + 1
  }

  categoriesDb.push(category);
  localStorage.setItem('categories', JSON.stringify(categoriesDb));
  window.location.href = './dashboard.html';
}

function edit_category() {
  let category_edit = JSON.parse(localStorage.getItem('category_edit'));

  if (category_edit != null) {
    document.getElementById('name').value = category_edit.name;
    document.getElementById('description').textContent = category_edit.description;
    document.getElementById('image').value = category_edit.image;
  }
  
}

function load_categories(){
  const categoriesDb = JSON.parse(localStorage.getItem('categories'));

  if(categoriesDb) {
    let options = "";
    categoriesDb.forEach((category) => {
      options += `<option value="${category.id}">${category.name}</option>`;
    })
    // renders the select authors-list with the authors found
    document.getElementById('categories-list').innerHTML = options;
  }
}

function edit_product() {
  let product_edit = JSON.parse(localStorage.getItem('product_edit'));

  if (product_edit != null) {
    document.getElementById('name').value = product_edit.name;
    document.getElementById('description').textContent = product_edit.description;
    document.getElementById('image').value = product_edit.image;
    document.getElementById('lf').textContent = product_edit.lf;
  }
  
}

function new_product() {
  let id_count = JSON.parse(localStorage.getItem('id_count'));
  let productsDb = JSON.parse(localStorage.getItem('products'));
  let product_edit = JSON.parse(localStorage.getItem('product_edit'));

  let cate = $('#categories-list :selected').text();

  if (product_edit != null) {
    //let edited = productsDb.find(item => item.id == product_edit.id);
    let index = productsDb.findIndex(item => item.id == product_edit.id);
    productsDb[index].name = $('#name').val();
    productsDb[index].description = $('#description').val();
    productsDb[index].image = $('#image').val();
    productsDb[index].lf = $('#lf').val();
    productsDb[index].category = cate;
    localStorage.setItem('products', JSON.stringify(productsDb));
    window.localStorage.removeItem('product_edit');
    window.location.href = './dashboard.html';
    return false;
  }

  const Name = $('#name').val();
  const Description = $('#description').val();
  const Image = $('#image').val();
  const LF = $('#lf').val();
  const Owner = JSON.parse(localStorage.getItem('user_loged')).id;

  //insert to a database
  if(!productsDb) {
    productsDb = [];
  }

  if(!id_count) {
    id_count = 0
  }

  const product = {
    name: Name,
    description: Description,
    image: Image,
    lf: LF,
    owner: Owner,
    category: cate,
    id: id_count + 1
  }

  productsDb.push(product);
  id_count += 1;
  localStorage.setItem('products', JSON.stringify(productsDb));
  localStorage.setItem('id_count', JSON.stringify(id_count));
  window.location.href = './dashboard.html';
}

function charge_all_products() {
  let productsDb = JSON.parse(localStorage.getItem('products'));
  let usersDb = JSON.parse(localStorage.getItem('users'));
  let cat = JSON.parse(localStorage.getItem('category_used'));

  if (cat != null) {
    for (let i=0; i<productsDb.length; i++) {
      if (productsDb[i].category == cat) {
        let new_li = document.createElement("li");
        let new_div2 = document.createElement("div");
        let new_div3 = document.createElement("div");
        let new_div4 = document.createElement("div");
        let img = document.createElement("img");
        let a = document.createElement("a");
        let name = document.createElement("h6");
        img.src = productsDb[i].image;
        a.textContent = productsDb[i].name;
        a.setAttribute('id', productsDb[i].id);
        name.textContent = "Usuario: "+usersDb.find(item => item.id == productsDb[i].owner).name;
    
        new_div3.appendChild(img);
        new_div4.appendChild(a);
        new_div4.appendChild(name);
        new_div2.appendChild(new_div3);
        new_div2.appendChild(new_div4);
        new_li.appendChild(new_div2);
        new_div3.classList.add("dash_product");
        new_div4.classList.add("dash_product");
        new_div2.classList.add("dash_li");
        img.classList.add("img_style");
        a.classList.add("center_text");
        name.classList.add("user_name");
        $('.categories').prepend(new_li);
      }
    }
    window.localStorage.removeItem('category_used');
    return false;
  }

  for (let i=0; i<productsDb.length; i++) {
    let new_li = document.createElement("li");
    let new_div2 = document.createElement("div");
    let new_div3 = document.createElement("div");
    let new_div4 = document.createElement("div");
    let img = document.createElement("img");
    let a = document.createElement("a");
    let name = document.createElement("h6");
    img.src = productsDb[i].image;
    a.textContent = productsDb[i].name;
    a.setAttribute('id', productsDb[i].id);
    name.textContent = "Usuario: "+usersDb.find(item => item.id == productsDb[i].owner).name;

    new_div3.appendChild(img);
    new_div4.appendChild(a);
    new_div4.appendChild(name);
    new_div2.appendChild(new_div3);
    new_div2.appendChild(new_div4);
    new_li.appendChild(new_div2);
    new_div3.classList.add("dash_product");
    new_div4.classList.add("dash_product");
    new_div2.classList.add("dash_li");
    img.classList.add("img_style");
    a.classList.add("center_text");
    name.classList.add("user_name");
    $('.categories').prepend(new_li);
  }
}

function charge_products() {
  let loged = JSON.parse(localStorage.getItem('user_loged'));
  let productsDb = JSON.parse(localStorage.getItem('products'));

  for (let i=0; i<productsDb.length; i++) {
    if (productsDb[i].owner == loged.id){
      let new_li = document.createElement("li");
      let new_div2 = document.createElement("div");
      let new_div3 = document.createElement("div");
      let new_div4 = document.createElement("div");
      let img = document.createElement("img");
      let bt = document.createElement("button");
      let bt2 = document.createElement("button");
      let a = document.createElement("a");
      img.src = productsDb[i].image;
      bt.textContent = "Editar";
      bt2.textContent = "Eliminar";
      a.textContent = productsDb[i].name;
      a.setAttribute('id', productsDb[i].id);
      bt.setAttribute('id', productsDb[i].id);
      bt2.setAttribute('id', productsDb[i].id);
  
      new_div3.appendChild(img);
      new_div4.appendChild(a);
      new_div4.appendChild(bt);
      new_div4.appendChild(bt2);
      new_div2.appendChild(new_div3);
      new_div2.appendChild(new_div4);
      new_li.appendChild(new_div2);
      new_div3.classList.add("dash_product");
      new_div4.classList.add("dash_product");
      new_div2.classList.add("dash_li");
      img.classList.add("img_style");
      bt.classList.add("edit_button");
      bt2.classList.add("micar_button_delete");
      a.classList.add("center_text");
      $('.dashboard_items').prepend(new_li);
    }
  }
}

function charge_all_categories() {
  let categoriesDb = JSON.parse(localStorage.getItem('categories'));

  for (let i=0; i<categoriesDb.length; i++) {
    let new_li = document.createElement("li");
    let new_h4 = document.createElement("h4");
    let img = document.createElement("img");
    img.src = categoriesDb[i].image;
    new_h4.textContent = categoriesDb[i].name;
    new_h4.setAttribute('id', categoriesDb[i].id);
    new_h4.setAttribute('name', 'categ');

    new_li.appendChild(img);
    new_li.appendChild(new_h4);
    img.classList.add("img_categories");
    new_h4.classList.add("center_text_cat");
    $('.categories').prepend(new_li);
  }
}

function charge_categories() {
  let loged = JSON.parse(localStorage.getItem('user_loged'));
  let categoriesDb = JSON.parse(localStorage.getItem('categories'));

  for (let i=0; i<categoriesDb.length; i++) {
    if (categoriesDb[i].owner == loged.id){
      let new_li = document.createElement("li");
      let new_h4 = document.createElement("h4");
      let img = document.createElement("img");
      let bt = document.createElement("button");
      img.src = categoriesDb[i].image;
      bt.textContent = "Editar";
      new_h4.textContent = categoriesDb[i].name;
      new_h4.setAttribute('id', categoriesDb[i].id);
      bt.setAttribute('id', categoriesDb[i].id);
  
      new_li.appendChild(img);
      new_li.appendChild(new_h4);
      new_li.appendChild(bt);
      img.classList.add("img_categories");
      bt.classList.add("edit_button_cat");
      new_h4.classList.add("center_text");
      $('.dashboard_categories').prepend(new_li);
    }
  }
}

function charge_last_products() {
  let productsDb = JSON.parse(localStorage.getItem('products')).reverse();

  for (let i=0; i<2; i++) {
    let new_li = document.createElement("li");
    let img = document.createElement("img");
    let a = document.createElement("h4");
    img.src = productsDb[i].image;
    a.textContent = productsDb[i].name;
    a.setAttribute('id', productsDb[i].id);

    new_li.appendChild(img);
    new_li.appendChild(a);
    img.classList.add("img_index_style");
    a.classList.add("pro_index");
    $('.last_products').prepend(new_li);
  }
}

function delete_product(id) {
  const productsDb = JSON.parse(localStorage.getItem('products'));
  const index = productsDb.findIndex(item => item.id == id);

  if (index > -1) {
    productsDb.splice(index, 1);
  }
  localStorage.setItem('products', JSON.stringify(productsDb));
  window.location.href = './dashboard.html';
}

function view_product() {
  let usersDb = JSON.parse(localStorage.getItem('users'));
  let product = JSON.parse(localStorage.getItem('view_product'));
  document.getElementById("imagep").src = product.image;
  document.getElementById("title").textContent = product.name;
  document.getElementById("owner").textContent= usersDb.find(item => item.id == product.owner).name;
  document.getElementById("description").textContent = product.description;
  document.getElementById("lf").textContent = product.lf;
}

function logout(link) {
  window.localStorage.removeItem('user_loged');
  window.location.href = link;
}

function check_loged() {
  let loged = JSON.parse(localStorage.getItem('user_loged'));

  if (loged == null) {
    document.getElementById('my_dashboard_btn').style.visibility = 'hidden';
  }
}