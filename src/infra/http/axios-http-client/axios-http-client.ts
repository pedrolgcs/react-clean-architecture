import axios from 'axios';

// protocols
import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient,
} from '@/data/protocols/http';

class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post(params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
    const response = await axios.post(params.url, params.body);

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}

export { AxiosHttpClient };
