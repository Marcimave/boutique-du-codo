// MENU
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("megaMenu");

toggle.addEventListener("click",(e)=>{

  e.stopPropagation();

  menu.classList.toggle("active");
});

// STOP PROPAGATION
menu.addEventListener("click",(e)=>{
  e.stopPropagation();
});

// CLOSE MENU
document.addEventListener("click",()=>{
  menu.classList.remove("active");
});

// PANIER
let cart = {};

// AJOUT PANIER
function addToCart(name,price,event){

  event.stopPropagation();

  if(cart[name]){

    cart[name].quantity++;

  }else{

    cart[name]={
      price:price,
      quantity:1
    };
  }

  updateCart();
}

// UPDATE PANIER
function updateCart(){

  const cartItems =
  document.getElementById("cartItems");

  const totalEl =
  document.getElementById("total");

  cartItems.innerHTML="";

  let total = 0;

  for(let name in cart){

    const item = cart[name];

    total += item.price * item.quantity;

    const div = document.createElement("div");
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
    
    let count = 0;

for(let name in cart){
  count += cart[name].quantity;
}

document.getElementById("cartCount")
.textContent = count;


    cartItems.appendChild(div);
  }

  totalEl.textContent = total;
}

// FULLSCREEN
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

  viewer.appendChild(clone);

  viewer.style.display = "flex";

  // CLOSE
  viewer.onclick = ()=>{

    viewer.style.display = "none";

    viewer.innerHTML = "";
  };
}

// ESC CLOSE
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

// WHATSAPP
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
