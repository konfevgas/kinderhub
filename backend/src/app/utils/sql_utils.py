from sqlalchemy.orm import Session

from app.database.models import Users


def check_user_exists(user_email: str, session: Session) -> bool:
    """
    Check if a user with the given email exists in the database.

    Args:
        user_email (str): The email of the user to check.
        session (Session): The database session.

    Returns:
        bool: True if the user exists, False otherwise.
    """
    email_exists = session.query(Users).filter(Users.email == user_email).first()
    return True if email_exists else False
