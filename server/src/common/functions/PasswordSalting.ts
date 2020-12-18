import crypto from "crypto";
import { hash, compare } from "bcrypt";
import { HASH_SALT } from "./../constants/index";

export const getPassword = async (pass: string): Promise<string> => {
  let hashed = await hash(pass, HASH_SALT);
  return hashed;
};

export const validatePassword = async (
  pass: string,
  saltedpassword: string
): Promise<boolean> => {
  return await compare(pass, saltedpassword);
};
