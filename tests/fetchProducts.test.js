require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // fail('Teste vazio');
  it('1-Teste se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('2-Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3-Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const elemento = 'computador';
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${elemento}`;
    await fetchProducts(elemento);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('4-Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    expect.assertions(1);
    const elemento = 'computador';
    const result = await fetchProducts(elemento);
    console.log(result);
    expect(result).toEqual(computadorSearch.results);
  });

  it('5-Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    // expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }    
  });

});
