import * as Yup from 'yup';

// error handler
import { getYupValidationErrors } from './error/getYupValidationErrors';

type Errors = {
  [key: string]: string;
};

class YupValidate {
  private schema: Yup.SchemaOf<unknown>;

  constructor(schema: Yup.SchemaOf<unknown>) {
    this.schema = schema;
  }

  async validate(data: unknown): Promise<Errors> {
    try {
      await this.schema.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return getYupValidationErrors(err);
      }
    }

    return null;
  }
}

export { YupValidate };
