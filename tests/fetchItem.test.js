require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // fail('Teste vazio');
  it('1-Teste se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('2-Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('3-Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint correto', async () => {
    // expect.assertions(1);
    const id = 'MLB1615760527';
    const url = `https://api.mercadolibre.com/items/${id}`;
    await fetchItem(id);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('4-Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    // expect.assertions(1);
    const elemento = 'MLB1615760527';
    expect(await fetchItem(elemento)).toEqual(item);
  });

  it('5-Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }    
  });
});
