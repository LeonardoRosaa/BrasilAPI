const axios = require('axios');

const requestUrl = `${global.SERVER_URL}/api/cnpj/v1`;

describe('api/cnpj/v1 (E2E)', () => {
  test('Utilizando um CNPJ válido: 19131243000197', async () => {
    const response = await axios.get(`${requestUrl}/19131243000197`);
    const { data, status } = response;

    expect(status).toEqual(200);
    expect(data.data.razao_social).toEqual('OPEN KNOWLEDGE BRASIL');
  });

  test('Utilizando um CNPJ inexistente: 00000000000000', async () => {
    try {
      await axios.get(`${requestUrl}/00000000000000`);
    } catch (error) {
      const { response } = error;
      const { data, status } = response;

      expect(status).toEqual(400);
      expect(data).toEqual({
        valid: false,
      });
    }
  });
});
