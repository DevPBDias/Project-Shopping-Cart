const saveCartItems = (saving) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  localStorage.setItem('cartItems', saving);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
