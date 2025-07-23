import prisma from "../utils/client.js";
import {
  karyawanUpdateValidation,
  karyawanValidation,
} from "../validation/karyawanValidation.js";

export const getAllKaryawan = async (req, res) => {
  try {
    const data = await prisma.karyawan.findMany(); // ambil semua tanpa filter

    return res.status(200).json({
      message: "Success get all employee list.",
      result: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch employees.",
      error: error.message, // tambahkan ini untuk bantu debugging
    });
  }
};

//  Create Karyawan
export const createKaryawan = async (req, res) => {
  const { error, value } = karyawanValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const result = await prisma.karyawan.create({
      data: {
        nama: value.nama,
        alamat: value.alamat,
        lulusan: value.lulusan,
        tgl_lahir: value.tgl_lahir,
        lama_kerja: value.lama_kerja,
        gaji: value.gaji,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Employee created successfully.",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create employee.",
    });
  }
};

//  Update Karyawan
export const updateKaryawan = async (req, res) => {
  const id = Number(req.params.id);

  const existing = await prisma.karyawan.findUnique({
    where: { id },
  });

  if (!existing) {
    return res.status(404).json({
      message: "Employee not found.",
    });
  }

  const { error, value } = karyawanUpdateValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  try {
    const result = await prisma.karyawan.update({
      where: { id },
      data: {
        nama: value.nama,
        alamat: value.alamat,
        lulusan: value.lulusan,
        tgl_lahir: value.tgl_lahir,
        lama_kerja: value.lama_kerja,
        gaji: value.gaji,
      },
    });

    return res.status(200).json({
      message: "Employee updated successfully.",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update employee.",
    });
  }
};

// 🔸 Delete Karyawan
export const deleteKaryawan = async (req, res) => {
  try {
    const result = await prisma.karyawan.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    result.password = "xxxxxxxxxxxxxxxxxxxxxxx";
    return res.status(200).json({
      message: "Karyawan deleted succesfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
    });
  }
};
