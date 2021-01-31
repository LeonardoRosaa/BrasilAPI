import axios from 'axios';

const minhaReceitaUrl = 'https://minhareceita.org/';

const onlyNumbers = (value) => {
  return value.replace(/\D/, '') || null;
};

export const getCnpjData = async (cnpj) => {
  /**
   * Remove possíveis caracteres especiais que podem ser passadas para @param cnpj
   * Exemplo: 21.027.190/0001-00 => 21027190000100
   */
  const rawCnpj = onlyNumbers(cnpj);

  try {
    const response = await axios.post(`${minhaReceitaUrl}?cnpj=${rawCnpj}`, {});
    return {
      valid: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response.data.message) {
      return { valid: false };
    }

    throw error;
  }
};
