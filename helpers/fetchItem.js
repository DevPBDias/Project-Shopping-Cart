const fetchItem = async (id) => {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${id}`;
    const reponse = await fetch(endpoint);
    const dado = await reponse.json();
    // console.log(dado);
    return dado; 
  } catch (error) {
    return new Error('You must provide an url');
  }
};

// fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
