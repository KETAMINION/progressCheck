import PG from 'pg'

const databaseUrl = process.env.POSTGRES_URL;

// if (undefined === databaseUrl) {
//   throw new Error(
//     "Your database URL is undefined. Please fix this bug before continuing"
//   );
// }

export const pool = new PG.Pool({
  connectionString: databaseUrl,
});


