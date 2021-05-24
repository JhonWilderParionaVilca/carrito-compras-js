//* https://www.w3schools.com/jsref/dom_obj_all.asp

const $coursesList = document.getElementById("lista-cursos");
const $cart = document.getElementById("carrito");
const $listItemsCart = $cart.querySelector("#lista-carrito tbody");
const $cleanCartBtn = document.getElementById("vaciar-carrito");

let cartElements = [];

(function loadListeners() {
  $coursesList.addEventListener("click", addShoppingCart);
  $cleanCartBtn.addEventListener("click", cleanCart);
  $listItemsCart.addEventListener("click", removeItemCart);
})();

function cleanCart(e) {
  e.preventDefault();
  cartElements = [];
  cleanCartHtml($listItemsCart);
}

function addShoppingCart(e) {
  const btnClick = catchClickAddButton(e, "agregar-carrito");
  if (!btnClick) {
    return;
  }
  const dataProduct = getDataProduct(btnClick);
  const products = addProductCartElements(dataProduct, cartElements);
  cartElements = [...products];
  showItemsCart(cartElements, $listItemsCart);
  return;
}

function catchClickAddButton(event, className) {
  if (event.target.classList.contains(className)) {
    event.preventDefault();
    return event.target;
  }
}

function getDataProduct(btnProduct) {
  const cardInfoProduct = btnProduct.parentElement.parentElement;
  const dataProduct = {
    img: cardInfoProduct.querySelector("img").src,
    title: cardInfoProduct.querySelector("h4").textContent,
    price: cardInfoProduct.querySelector(".precio span").textContent,
    id: btnProduct.getAttribute("data-id"),
    quantity: 1,
  };
  return dataProduct;
}

function addProductCartElements(dataProduct, cartElements) {
  let products = [...cartElements];
  const { id } = dataProduct;
  const hasProduct = existProduct(id, products);
  if (hasProduct) {
    products.forEach((product) => {
      if (product.id === id) {
        product.quantity++;
      }
    });
  } else {
    products = [...products, dataProduct];
  }
  return products;
}

function existProduct(id, products) {
  const hasProduct = products.some((product) => product.id === id);
  return hasProduct;
}

function showItemsCart(cartItems, $tbody) {
  cleanCartHtml($tbody);

  cartItems.forEach((item) => {
    const itemProduct = document.createElement("tr");
    const { img, title, price, quantity, id } = item;

    itemProduct.innerHTML = `
    <td><img src=${img} width="100"/></td>
    <td>${title}</td>
    <td>${price}</td>
    <td>${quantity}</td>
    <td><a href="#" class="borrar-curso" data-id=${id}>x</a></td>
  `;
    $tbody.appendChild(itemProduct);
  });
}

function cleanCartHtml($tbody) {
  while ($tbody.firstChild) {
    $tbody.removeChild($tbody.firstChild);
  }
}

function removeItemCart(e) {
  const btnRemoveReference = catchClickAddButton(e, "borrar-curso");
  if (!btnRemoveReference) {
    return;
  }
  const productId = btnRemoveReference.getAttribute("data-id");
  decreaseQuantity(cartElements, productId);
  showItemsCart(cartElements, $listItemsCart);
  return;
}

function decreaseQuantity(products, idProduct) {
  products.filter((product, index) => {
    if (product.id === idProduct) {
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        products.splice(index, 1);
      }
    }
    return product;
  });
}
