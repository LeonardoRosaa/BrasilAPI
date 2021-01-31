import microCors from 'micro-cors';
import { getCnpjData } from '../../../../services/cnpj';

const cors = microCors();
const CACHE_CONTROL_HEADER_VALUE =
  'max-age=0, s-maxage=86400, stale-while-revalidate';

async function cnpjData(request, response) {
  response.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE);
  try {
    const result = await getCnpjData(request.query.cnpj);

    if (result.valid) {
      response.status(200);
    } else {
      response.status(400);
    }

    response.json(result);
  } catch (error) {
    response.status(500);
    response.json(error);
  }
}

export default cors(cnpjData);
