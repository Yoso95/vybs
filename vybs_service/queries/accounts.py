from models.accounts import AccountIn, AccountOutWithPassword
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                         , username
                         , hashed_password
                         , full_name
                         , email
                         , avatar
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithPassword(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    full_name=record[3],
                    email=record[4],
                    avatar=record[5],
                )

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts (username, hashed_password,
                    full_name, email, avatar)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.username,
                        hashed_password,
                        account.full_name,
                        account.email,
                        account.avatar,
                    ],
                )
                id = result.fetchone()[0]
                return AccountOutWithPassword(
                    id=id,
                    username=account.username,
                    hashed_password=hashed_password,
                    full_name=account.full_name,
                    email=account.email,
                    avatar=account.avatar,
                )
