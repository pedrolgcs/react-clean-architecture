import axios from 'axios';

// protocols
import { HttpPostParams } from '@/data/protocols/http';

class AxiosHttpClient {
  async post(params: HttpPostParams<unknown>): Promise<void> {
    await axios.post(params.url);
  }
}

export { AxiosHttpClient };
