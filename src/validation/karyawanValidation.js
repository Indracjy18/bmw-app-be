import Joi from "joi";

export const karyawanValidation = (payload) => {
  const schema = Joi.object({
    nama: Joi.string().min(2).required(),
    alamat: Joi.string().required(),
    lulusan: Joi.string().required(),
    tgl_lahir: Joi.date().less("now").required(),
    lama_kerja: Joi.date().greater(Joi.ref("tgl_lahir")).required(),
    gaji: Joi.number().min(0).required(),
  });

  return schema.validate(payload);
};

export const karyawanUpdateValidation = (payload) => {
  const schema = Joi.object({
    nama: Joi.string().min(2).required(),
    alamat: Joi.string().required(),
    lulusan: Joi.string().required(),
    tgl_lahir: Joi.date().less("now"),
    lama_kerja: Joi.date().greater(Joi.ref("tgl_lahir")).required(),
    gaji: Joi.number().min(0).required(),
  });

  return schema.validate(payload);
};
