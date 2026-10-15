/**
 * Create an admin account, or reset an existing admin's password.
 *
 *   npm run admin:create -- <username> "<Full Name>"
 *
 * The password is asked for interactively (hidden), or read from ADMIN_PASSWORD.
 */
import { createInterface } from "node:readline";

import { hashPassword } from "../src/lib/auth/password.ts";
import { getDb } from "../src/lib/db.ts";

const [username, name] = process.argv.slice(2);
if (!username || !name) {
  console.error('Usage: npm run admin:create -- <username> "<Full Name>"');
  process.exit(1);
}

function askHidden(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  const output = rl as unknown as { _writeToOutput: (s: string) => void };
  let prompted = false;
  output._writeToOutput = (s) => {
    // Print the prompt once, then hide every typed character
    if (!prompted) {
      process.stdout.write(s);
      prompted = true;
    }
  };
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    }),
  );
}

let password = process.env["ADMIN_PASSWORD"];
if (!password) {
  password = await askHidden("Password (min 8 characters): ");
  const confirm = await askHidden("Confirm password: ");
  if (password !== confirm) {
    console.error("Passwords do not match.");
    process.exit(1);
  }
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const db = getDb();
const passwordHash = await hashPassword(password);
const existing = db.prepare("SELECT id FROM admins WHERE username = ?").get(username) as
  { id: number } | undefined;

if (existing) {
  db.prepare("UPDATE admins SET name = ?, password_hash = ? WHERE id = ?").run(
    name,
    passwordHash,
    existing.id,
  );
  // Sign out everywhere after a password reset
  db.prepare("DELETE FROM sessions WHERE admin_id = ?").run(existing.id);
  console.log(`Updated admin "${username}".`);
} else {
  db.prepare("INSERT INTO admins (username, name, password_hash) VALUES (?, ?, ?)").run(
    username,
    name,
    passwordHash,
  );
  console.log(`Created admin "${username}".`);
}
