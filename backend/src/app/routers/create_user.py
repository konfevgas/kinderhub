from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Users
from app.utils.sql_utils import add_new_user, check_user_exists

router = APIRouter()


@router.post("/create_user")
async def create_user(user: Users, db_session: Session = Depends(get_db)) -> Users:
    """
    Route to create a new user.

    Args:
        user (Users): The user information.
        db_session (Session): The database session.

    Returns:
        Users: The created user information.
    """
    # Check if email already exists
    if not check_user_exists(user_email=user.email, session=db_session):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_user = add_new_user(user_data=user, session=db_session)

    return new_user
