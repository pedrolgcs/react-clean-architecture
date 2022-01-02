import * as Yup from 'yup';

// error handler
import { getYupValidationErros } from './getYupValidationErros';

// protocols
import { Validation, Errors } from '@/presentation/protocols';

class YupValidate implements Validation {
  private schema: Yup.SchemaOf<unknown>;

  constructor(schema: Yup.SchemaOf<unknown>) {
    this.schema = schema;
  }

  async validate(data: unknown): Promise<Errors> {
    try {
      await this.schema.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return getYupValidationErros(err);
      }
    }

    return null;
  }
}

export { YupValidate };
