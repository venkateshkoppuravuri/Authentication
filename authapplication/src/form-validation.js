import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from "@lemoncode/fonk";

const validationSchema = {
  field: {
    name: [Validators.required.validator],
    email: [
      Validators.required.validator,
      {
        validator: Validators.pattern.validator,
        customArgs: {
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        message: "Please enter valid email address",
      },
    ],
    password: [
      Validators.required.validator,
      {
        validator: Validators.pattern.validator,
        customArgs: {
          pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        },
        message: "Please enter valid password.",
      },
    ],
    country: [Validators.required.validator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
