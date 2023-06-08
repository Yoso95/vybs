from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class AccountQueries:
    def get_all_accounts(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, hashed_password, full_name,
                    avatar, email
                    FROM accounts;
                    """
                )
            results = []
            for row in cur.fetchall():
                user = {
                    "id": row[0],
                    "username": row[1],
                    "hashed_password": row[2],
                    "full_name": row[3],
                    "avatar ": row[4],
                    "email": row[5],
                }
                results.append(user)
            return results
