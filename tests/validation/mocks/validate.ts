// protocols
import { Validation, Errors } from '@/presentation/protocols';

class MockValidate implements Validation {
  private error: Errors;

  private data: unknown;

  constructor(error?: Errors) {
    this.error = error;
  }

  async validate(data: unknown): Promise<Errors> {
    this.data = data;
    return this.error;
  }
}

export { MockValidate };
