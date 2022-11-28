import { Joi, Segments } from "celebrate";

export const savePostValidation = {
  [Segments.BODY]: {
    content: Joi.string().required(),
    parentId: Joi.number(),
  },
};