const allCartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// funçao que cria elementos html e joga nas outras funçoes para criar elementos html
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// funçao que remove o item do carrinho ao clickar
function cartItemClickListener(evento) {
  console.log(evento.target);
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Event/target
  evento.target.remove();
  // toda vez que eu faço algo eu salvo no meu localStorage, entao em todo lugar q altera a lista eu uso para salvar
  saveCartItems(allCartItems.innerHTML);
}

// Para remover a lista c o botao
//  pegando ol e removeCHild
//  pegando ol e innerHTML vazio
//  pegando cart-item e remove neles

function buttonCartRemove() {
  const esvaziaButton = document.querySelector('.empty-cart');
  esvaziaButton.addEventListener('click', () => {
    const carrinho = document.querySelectorAll('.cart__item');
    carrinho.forEach((elemento) => elemento.remove());
    // toda vez que eu faço algo eu salvo no meu localStorage, entao em todo lugar q altera a lista eu uso para salvar
    saveCartItems(allCartItems.innerHTML);
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const callbackFecthItem = async (idItem) => {
  const produto = await fetchItem(idItem);
  // console.log(produto);
  const formato = {
    sku: produto.id,
    name: produto.title,
    salePrice: produto.price,
  };
  // console.log(formato); // mostra o elemento com formato do requisito 2 
  allCartItems.appendChild(createCartItemElement(formato));
  saveCartItems(allCartItems.innerHTML); // é aqui que coloca?
};

function addBUtton() {
  const htmlButton = document.querySelectorAll('.item__add');
  // console.log(htmlButton); // mostra uma node list
  htmlButton.forEach((elemento) => elemento.addEventListener('click', (evento) => {
    const idItem = getSkuFromProductItem(evento.target.parentNode);
    callbackFecthItem(idItem);
  }));
}

// funçao que chama a fetch pro script e trabalha para retornar os produtos na tela
const callbackFecthProducts = async () => {
  const html = document.querySelector('.items');
  // console.log(html); pega a section de classe items
  const produtos = await fetchProducts('computador');
  // console.log(produtos); salva os produtos numa variavel
  produtos.forEach((elemento) => {
    const formato = {
      sku: elemento.id,
      name: elemento.title,
      image: elemento.thumbnail,
    };
    // console.log(formato); // mostra os produtos com formato ; sku,name,image
    html.appendChild(createProductItemElement(formato));
  });
  addBUtton();
};

function returnLocalStorage() {
  // recuperando o item do localstorage
  const savedCart = getSavedCartItems();
  // salvando o item do local storage no html do carrinho
  allCartItems.innerHTML = savedCart;
  // refazendo a funçao de remover o item do carrinho, desse jeito os dedos caem de tanto digitar e retrabalho kk
  allCartItems.addEventListener('click', (evento) => {
    if (evento.target.className === 'cart__item') {
      evento.target.remove();
      saveCartItems(allCartItems.innerHTML);
    }
  });
}

window.onload = async () => {
  await callbackFecthProducts();
  returnLocalStorage();
  buttonCartRemove();
};
