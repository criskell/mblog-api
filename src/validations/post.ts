import { Joi, Segments } from "celebrate";

export const createPostValidation = {
  [Segments.BODY]: {
    content: Joi.string().required(),
  },
};