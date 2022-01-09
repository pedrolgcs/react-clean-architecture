import axios, { AxiosResponse } from 'axios';

// protocols
import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http';

export class AxiosHttpClient<R> implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: {
          'Content-Type': 'application/json',
          ...data.headers,
        },
      });
    } catch (error) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
