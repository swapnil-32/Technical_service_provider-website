const z=require("zod")
const signupschema=z.object({
    username:z
    .string({required_error:"name is required"})
    .trim()
    .min(3,{message:"name must be at least 3 letters"})
    .max(255,{message:"name has at most 255 letters"}),
    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"invalid mail"})
    .min(3,{message:"email must be at least 3 letters"})
    .max(255,{message:"email has at most 255 letters"}),
    phone:z
    .string({required_error:"phone number is required"})
    .trim()
    .min(10,{message:"phone number must be 10 letters"})
    .max(10,{message:"phone number has at most 10 letters"}),
    password:z
    .string({required_error:"password is required"})
    .min(3,{message:"password must be at least 3 letters"})
    .max(255,{message:"password has at most 255 letters"}),
})

const signinschema=z.object({
    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"invalid mail"})
    .min(3,{message:"email must be at least 3 letters"})
    .max(255,{message:"email has at most 255 letters"}),
    password:z
    .string({required_error:"password is required"})
    .min(3,{message:"password must be at least 3 letters"})
    .max(255,{message:"password has at most 255 letters"}),
})
module.exports={signupschema,signinschema};
