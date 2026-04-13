import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema.ts';
import {User} from "../express/ClassDefinitions"
  
const db = drizzle(process.env.DATABASE_URL!);

