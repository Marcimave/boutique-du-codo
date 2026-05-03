// ==========================
// MENU
// ==========================

const toggle = document.querySelector(".menu-title");
const menu = document.getElementById("megaMenu");

// OUVRIR / FERMER MENU
toggle.addEventListener("click",(e)=>{

  e.stopPropagation();

  menu.classList.toggle("active");
});

// EMPÊCHE LA FERMETURE
menu.addEventListener("click",(e)=>{

  e.stopPropagation();
});

// FERMER SI CLIC EXTÉRIEUR
document.addEventListener("click",()=>{

  menu.classList.remove("active");
});

// ==========================
// PANIER
// ==========================

let cart = {};

// ==========================
// AJOUT PANIER
// ==========================

function addToCart(name,price,event,option=""){

  event.stopPropagation();

  // OPTION PRODUIT
  const key =
  option && option !== ""
  ? `${name} (${option})`
  : name;

  // AJOUT
  if(cart[key]){

    cart[key].quantity++;

  }else{

    cart[key] = {
      price:price,
      quantity:1
    };
  }

  updateCart();
}

// ==========================
// UPDATE PANIER
// ==========================

function updateCart(){

  const cartItems =
  document.getElementById("cartItems");

  const totalEl =
  document.getElementById("total");

  const cartCount =
  document.getElementById("cartCount");

  // SÉCURITÉ
  if(!cartItems || !totalEl || !cartCount){
    return;
  }

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  for(let name in cart){

    const item = cart[name];

    total += item.price * item.quantity;

    count += item.quantity;

    // PRODUIT
    const div =
    document.createElement("div");

    div.className = "cart-item";

    div.textContent =
    `${name} : ${item.price} FCFA ×${item.quantity}`;

    // SUPPRESSION
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

// ==========================
// FULLSCREEN
// ==========================

function toggleFullscreen(el,event){

  event.stopPropagation();

  const viewer =
  document.getElementById("fullscreenViewer");

  // SÉCURITÉ
  if(!viewer){
    return;
  }

  // RESET
  viewer.innerHTML = "";

  // CLONE
  const clone = el.cloneNode(true);

  // SUPPRIME onclick
  clone.removeAttribute("onclick");

  // AJOUT
  viewer.appendChild(clone);

  // AFFICHE
  viewer.style.display = "flex";

  // EMPÊCHE PROPAGATION
  viewer.onclick = (e)=>{

    e.stopPropagation();
  };

  // DOUBLE CLIC = FERMER
  viewer.ondblclick = (e)=>{

    e.stopPropagation();

    viewer.style.display = "none";

    viewer.innerHTML = "";
  };
}

// ==========================
// ESC = FERMER FULLSCREEN
// ==========================

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

// ==========================
// WHATSAPP
// ==========================

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

  message += `\nTOTAL : ${total} FCFA`;

  const phone = "241065158925";

  const url =
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url,"_blank");
}

// ==========================
// OUVRIR PANIER
// ==========================

function openCart(){

  document
  .getElementById("floatingCart")
  .classList.add("active");

  document
  .getElementById("cartOverlay")
  .classList.add("active");
}

// ==========================
// FERMER PANIER
// ==========================

function closeCart(){

  document
  .getElementById("floatingCart")
  .classList.remove("active");

  document
  .getElementById("cartOverlay")
  .classList.remove("active");
}
