import bcrypt from "bcrypt";

const saltRounds = 10; // You can adjust the number of salt rounds based on your needs.

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

// Function to compare a password with the secret (hashed) password
export async function comparePassword(password: string, secret: string): Promise<boolean> {
  return bcrypt.compare(password, secret);
}
