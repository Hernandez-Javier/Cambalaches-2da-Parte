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
    //console.log(JSON.parse(localStorage.getItem('books')));
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

function charge_products() {    
    
    let new_li = document.createElement("li");
    let new_div2 = document.createElement("div");
    let new_div3 = document.createElement("div");
    let new_div4 = document.createElement("div");

    new_div2.appendChild(new_div3);
    new_div2.appendChild(new_div4);
    new_li.appendChild(new_div2);
}

function loged() {
    let loged = JSON.parse(localStorage.getItem('user_loged'));
    document.getElementById('text123').value = loged;
    return loged.name;
}