import crypto, { scrypt, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt); // Callback to promese implementation

const ALGORITHM = 'aes-256-cbc'; // Difining ALGORITHM
// Defining KEY
const KEY = crypto.pbkdf2Sync(Buffer.from('ticketpass'), Buffer.from('ticketsalt'), 65536, 32, 'sha1');
// Defining initialization vector
const IV = crypto.pbkdf2Sync(Buffer.from('ticketpass'), Buffer.from('ticketsalt'), 65536, 16, 'sha1');

export class Password {

  static encrypt(password: string) {
    var cipher = createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
    // Updating password
    let encrypted = cipher.update(password);

    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${encrypted.toString('hex')}.${IV.toString('hex')}`;
  }

  static compare(storedPassword: string, spuppliedPassword: string) {
    const [hashedPassword, iv] = storedPassword.split('.');

    let ivBuff = Buffer.from(iv, 'hex');
    let hashedPasswordBuff = Buffer.from(hashedPassword, 'hex');
    let decipher = createDecipheriv(ALGORITHM, Buffer.from(KEY), ivBuff);
    let decrypted = decipher.update(hashedPasswordBuff);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString() === spuppliedPassword;
  }

  // TODO: there is an issue with async and await in toHash
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');

    // Define as Buffer to tell typescript the type
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // Template string
    // <hashed password>.<salt>
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compareOld(storedPassword: string, spuppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(spuppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
