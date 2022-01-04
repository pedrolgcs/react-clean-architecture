import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const populateField = (
  fieldName: string,
  value = faker.random.word(),
): void => {
  const input = screen.getByTestId(fieldName);

  fireEvent.input(input, { target: { value } });
};
