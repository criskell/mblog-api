import { celebrator } from "celebrate";

const celebrateOptions = {};
const joiOptions = {
  abortEarly: false,
};

export default celebrator(celebrateOptions, joiOptions);
