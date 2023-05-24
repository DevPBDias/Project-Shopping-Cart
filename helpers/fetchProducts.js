// Você deve criar uma listagem de produtos que devem ser consultados através da API do Mercado Livre.
const fetchProducts = async (elemento) => {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${elemento}`;
    // deixando a api de forma dinamica para receber o valor computadores
    const reponse = await fetch(endpoint);
    // tratando os dados
    const dados = await reponse.json();
    // para acessar somente a propriedade results do obj salvo em dados
    const { results } = dados;
    // console.log(results); // mostra todos os produtos chamados
    return results;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
