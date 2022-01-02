export type Errors = {
  [key: string]: string;
};

export interface Validation {
  validate: (data: unknown) => Promise<Errors>;
}
