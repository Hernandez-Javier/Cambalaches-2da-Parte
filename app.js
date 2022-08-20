const container = document.querySelector('.categories');
const container_dash = document.querySelector('.dashboard_items');
(()=>{
  if (container_dash) {
    container_dash.addEventListener('click', delegate);
  }
  if (container) {
    container.addEventListener('click', delegate);
  }
})();

function delegate(e) {
  let productsDb = JSON.parse(localStorage.getItem('products'));
  e.preventDefault();
  localStorage.setItem('view_product', JSON.stringify(productsDb.find(item => item.id == e.target.id)));
  let test = JSON.parse(localStorage.getItem('view_product'));
  if (test != null) {
    window.location.href = './products.html';
  }
}

function addUser(){
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
  window.location.href = 'dashboard.html';
}

function login() {
  const Email = $('#email').val();
  const Pass = $('#pass').val();

  let usersDb = JSON.parse(localStorage.getItem('users'));
  let loged = 0;

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

function new_product() {
  const Name = $('#name').val();
  const Description = $('#description').val();
  const Image = $('#image').val();
  const LF = $('#lf').val();
  const Owner = JSON.parse(localStorage.getItem('user_loged')).id;

  //insert to a database
  let productsDb = JSON.parse(localStorage.getItem('products'));
  if(!productsDb) {
    productsDb = [];
  }

  const product = {
    name: Name,
    description: Description,
    image: Image,
    lf: LF,
    owner: Owner,
    id: productsDb.length + 1
  }

  productsDb.push(product);
  localStorage.setItem('products', JSON.stringify(productsDb));
  //console.log(JSON.parse(localStorage.getItem('books')));
  window.location.href = 'dashboard.html';
}

function charge_all_products() {
  let productsDb = JSON.parse(localStorage.getItem('products'));
  let usersDb = JSON.parse(localStorage.getItem('users'));

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
      //bt.addEventListener('click', go_edit_product.pass(bt.id));
      bt.addEventListener('click', localStorage.setItem('product_edit', JSON.stringify(productsDb.find(item => item.id == bt.id))));
      //bt2.addEventListener('click', delete_product.bind(productsDb[i].id);
  
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
      bt.classList.add("micar_button");
      bt2.classList.add("micar_button_delete");
      a.classList.add("center_text");
      $('.dashboard_items').prepend(new_li);
    }
  }
}

function go_edit_product(id) {
  window.location.href = './edit_product.html';
}

function delete_product(id) {
  const productsDb = JSON.parse(localStorage.getItem('products'));
  const index = productsDb.findIndex(item => item.id === id);
  if (index > -1) {
    productsDb.splice(index, 1);
  }
  localStorage.setItem('products', JSON.stringify(productsDb));
}

function view_product() {
  let usersDb = JSON.parse(localStorage.getItem('users'));
  let product = JSON.parse(localStorage.getItem('view_product'));
  document.getElementById("imagep").src = product.image;
  document.getElementById("title").textContent = product.name;
  document.getElementById("owner").textContent= usersDb.find(item => item.id == product.owner).name;
  document.getElementById("description").textContent = product.description;
  document.getElementById("lf").textContent = product.lf;


  let new_div = document.createElement("div");
  let new_div2 = document.createElement("div");
  let img = document.createElement("img");
  let bt = document.createElement("button");
  let new_h1 = document.createElement("h1");
  let new_h6 = document.createElement("h6");
  let new_div3 = document.createElement("div");
  let new_h2 = document.createElement("h2");
  let new_p = document.createElement("p");
  let new_h2_2 = document.createElement("h2");
  let new_p2 = document.createElement("p");
  let new_div4 = document.createElement("div");
}

function loged() {
    let loged = JSON.parse(localStorage.getItem('user_loged'));
    document.getElementById('text123').value = loged;
    return loged.name;
}