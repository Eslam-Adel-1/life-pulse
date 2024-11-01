import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "حقل فارغ او بريد الكتروني غير صحيح" }),
  password: z
    .string()
    .min(8, { message: "كلمة السر يجب ان تكون 8 حروف على الاقل" })
    .regex(/[a-z]/, {
      message: "كلمة السر يجب ان تحتوي على حرف صغير",
    })
    .regex(/[A-Z]/, {
      message: "كلمة السر يجب ان تحتوي على حرف كبير",
    })
    .regex(/\d/, { message: "كلمة السر يجب ان تحتوي على رقم" })
    .regex(/[@$!%*?&]/, {
      message: "@ : كلمة السر يجب ان تحتوي على رمز مثال ",
    }),
});

//===============================================================================

export const userRegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "يجب ان يكون الاسم 3 حروف على الاقل" }),
    last_name: z
      .string()
      .min(3, { message: "يجب ان يكون الاسم 3 حروف على الاقل" }),
    email: z.string().email({ message: "حقل فارغ او بريد الكتروني غير صحيح" }),
    phoneNumber: z
      .string()
      .min(7, { message: "رقم الهاتف يجب ان يكون 7 ارقام على الاقل" }),
    password: z
      .string()
      .min(8, { message: "كلمة السر يجب ان تكون 8 حروف على الاقل" })
      .regex(/[a-z]/, {
        message: "كلمة السر يجب ان تحتوي على حرف صغير",
      })
      .regex(/[A-Z]/, {
        message: "كلمة السر يجب ان تحتوي على حرف كبير",
      })
      .regex(/\d/, { message: "كلمة السر يجب ان تحتوي على رقم" })
      .regex(/[@$!%*?&]/, {
        message: "@ : كلمة السر يجب ان تحتوي على رمز مثال ",
      }),
    confirmPassword: z.string(),
  })
  .refine((object) => object.password === object.confirmPassword, {
    message: "كلمات السر غير متطابقة",
    path: ["confirmPassword"],
  });

//===============================================================================
export const doctorRegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "يجب ان يكون الاسم 3 حروف على الاقل" }),
    last_name: z
      .string()
      .min(3, { message: "يجب ان يكون الاسم 3 حروف على الاقل" }),
    email: z.string().email({ message: "حقل فارغ او بريد الكتروني غير صحيح" }),
    phoneNumber: z
      .string()
      .min(7, { message: "رقم الهاتف يجب ان يكون 7 ارقام على الاقل" }),

    speciality: z
      .string()
      .max(100, { message: "التخصص 100 حرف فقط" })
      .min(5, { message: "التخصص 5 احرف على الاقل" }),
    password: z
      .string()
      .min(8, { message: "كلمة السر يجب ان تكون 8 حروف على الاقل" })
      .regex(/[a-z]/, {
        message: "كلمة السر يجب ان تحتوي على حرف صغير",
      })
      .regex(/[A-Z]/, {
        message: "كلمة السر يجب ان تحتوي على حرف كبير",
      })
      .regex(/\d/, { message: "كلمة السر يجب ان تحتوي على رقم" })
      .regex(/[@$!%*?&]/, {
        message: "@ : كلمة السر يجب ان تحتوي على رمز مثال ",
      }),
    confirmPassword: z.string(),
  })
  .refine((object) => object.password === object.confirmPassword, {
    message: "كلمات السر غير متطابقة",
    path: ["confirmPassword"],
  });

//===============================================================================
export const doctorUpdateSchema = z.object({
  bio: z
    .string()
    .max(1000, { message: "يجب ان لا يزيد الوصف عن 1000 حرف" })
    .min(100, { message: "يجب ان لا يقل الوصف عن 100 حرف" }),
  university: z
    .string()
    .max(200, { message: "يجب ان لا يزيد الوصف عن 200 حرف" })
    .min(20, { message: "يجب ان لا يقل الوصف عن 20 حرف" }),
  clinic: z
    .string()
    .max(150, { message: "يجب ان لا يزيد الوصف عن 150 حرف" })
    .min(10, { message: "يجب ان لا يقل الوصف عن 10 حرف" }),
});
