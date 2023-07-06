import bcrypt from "bcrypt";

export async function hashData(data) {
  return bcrypt.hash(data, 10);
}

export async function compareData(data, hashData) {
  return bcrypt.compare(data, hashData);
}
