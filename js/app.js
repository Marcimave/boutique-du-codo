// =========================
// MENU
// =========================

const toggle =
document.getElementById("menuToggle");

const menu =
document.getElementById("megaMenu");

const menuTitle =
document.querySelector(".menu-title");

// OUVRIR / FERMER MENU
toggle.addEventListener("click",(e)=>{

  e.stopPropagation();

  menu.classList.toggle("active");
});

// EMPÊCHE FERMETURE
menu.addEventListener("click",(e)=>{
  e.stopPropagation();
});

// FERMER MENU SI CLIC EXTÉRIEUR
document.addEventListener("click",(e)=>{

  // Ignore clic galerie
  if(
    menu.contains(e.target) ||
    menuTitle.contains(e.target)
  ){
    return;
  }

  // Ignore fullscreen
  const viewer =
  document.getElementById("fullscreenViewer");

  if(
    viewer &&
    viewer.contains(e.target)
  ){
    return;
  }

  // Fermer galerie
  menu.classList.remove("active");
});

// =========================
// PANIER
// =========================

let cart = {};

// AJOUT PANIER
function addToCart(name, price, event, option = "") {

  event.stopPropagation();

  if(option === ""){
    alert("Veuillez choisir une option");
    return;
  }

  const productKey = `${name} (${option})`;

  if(cart[productKey]){

    cart[productKey].quantity++;

  }else{

    cart[productKey] = {
      price: price,
      quantity: 1
    };
  }

  updateCart();
}

// =========================
// UPDATE PANIER
// =========================

function updateCart(){

  const cartItems =
  document.getElementById("cartItems");

  const totalEl =
  document.getElementById("total");

  const cartCount =
  document.getElementById("cartCount");

  cartItems.innerHTML = "";

  let total = 0;

  let count = 0;

  for(let name in cart){

    const item = cart[name];

    total += item.price * item.quantity;

    count += item.quantity;

    const div =
    document.createElement("div");

    div.className = "cart-item";

    div.textContent =
    `${name} : ${item.price} FCFA ×${item.quantity}`;

    // SUPPRIMER 1 ARTICLE
    div.onclick = ()=>{

      item.quantity--;

      if(item.quantity <= 0){

        delete cart[name];
      }

      updateCart();
    };

    cartItems.appendChild(div);
  }

  totalEl.textContent = total;

  cartCount.textContent = count;
}

// =========================
// FULLSCREEN
// =========================

function toggleFullscreen(el,event){

  event.stopPropagation();

  let viewer =
  document.getElementById("fullscreenViewer");

  // CREATE
  if(!viewer){

    viewer =
    document.createElement("div");

    viewer.id = "fullscreenViewer";

    document.body.appendChild(viewer);
  }

  // RESET
  viewer.innerHTML = "";

  // CLONE
  const clone = el.cloneNode(true);

  clone.removeAttribute("onclick");

  // AJOUT MEDIA
  viewer.appendChild(clone);

  // SHOW
  viewer.style.display = "flex";

  // FERMER FULLSCREEN
  viewer.onclick = (e)=>{

    e.stopPropagation();

    viewer.style.display = "none";

    viewer.innerHTML = "";
  };
}

// =========================
// ESCAPE CLOSE
// =========================

document.addEventListener("keydown",(e)=>{

  if(e.key === "Escape"){

    const viewer =
    document.getElementById("fullscreenViewer");

    if(viewer){

      viewer.style.display = "none";

      viewer.innerHTML = "";
    }
  }
});

// =========================
// WHATSAPP
// =========================

function checkout(){

  if(Object.keys(cart).length === 0){

    alert("Panier vide !");
    return;
  }

  let message =
  "🛒 COMMANDE MARKETPLACE\n\n";

  let total = 0;

  for(let name in cart){

    const item = cart[name];

    total += item.price * item.quantity;

    message +=
    `${name} : ${item.price} FCFA ×${item.quantity}\n`;
  }

  message +=
  `\nTOTAL : ${total} FCFA`;

  const phone =
  "241065158925";

  const url =
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url,"_blank");
}

// =========================
// OUVRIR PANIER
// =========================

function openCart(){

  document
  .getElementById("floatingCart")
  .classList.add("active");

  document
  .getElementById("cartOverlay")
  .classList.add("active");
}

// =========================
// FERMER PANIER
// =========================

function closeCart(){

  document
  .getElementById("floatingCart")
  .classList.remove("active");

  document
  .getElementById("cartOverlay")
  .classList.remove("active");
}

