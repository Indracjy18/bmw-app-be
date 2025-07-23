import Joi from "joi";

export const userValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(payload);
};

export const userUpdateValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().min(4).email().trim().required(), // Email minimal 4 karakter, wajib
    password: Joi.string().allow(null, ""), // Boleh kosong/null
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .when("password", {
        is: Joi.exist().not("").not(null), // hanya validasi kalau password tidak kosong/null
        then: Joi.required().messages({
          "any.only": "Confirm Password must match Password",
          "any.required":
            "Confirm Password is required when Password is filled",
        }),
        otherwise: Joi.optional(),
      }),
  });

  return schema.validate(payload);
};
