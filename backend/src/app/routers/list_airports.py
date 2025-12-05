from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Airports
from app.schemas.list_airports import ListAirportsReponse

router = APIRouter()


@router.get("/list_airports")
async def list_airports(
    search: str | None = Query(
        default=None,
        description="Search by name, city, country, IATA, ICAO",
    ),
    limit: int = Query(default=5, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    sort_by: str | None = Query(
        default="name", pattern="^(name|country)$", description="Sort results by name or country"
    ),
    db_session: Session = Depends(get_db),
) -> list[ListAirportsReponse]:
    """
    Route to list airports.

    Args:
        search (str | None): The search term to filter airports by name, city, country, IATA, or ICAO.
        limit (int): The maximum number of results to return.
        offset (int): The number of results to skip.
        sort_by (str | None): The field to sort results by.
        db_session (Session): The database session.

    Returns:
        list[ListAirportsReponse]: A list of airports matching the query.
    """
    # Start base query
    db_query = db_session.query(Airports)

    # --------- Filtering ---------
    if search:
        q_like = f"%{search}%"
        db_query = db_query.filter(
            (Airports.name.ilike(q_like))
            | (Airports.city.ilike(q_like))
            | (Airports.country.ilike(q_like))
            | (Airports.iata.ilike(q_like))
            | (Airports.icao.ilike(q_like))
        )

    # --------- Sorting ---------
    if sort_by == "name":
        db_query = db_query.order_by(Airports.name.asc())
    elif sort_by == "country":
        db_query = db_query.order_by(Airports.country.asc())

    # --------- Pagination ---------
    airports = db_query.offset(offset).limit(limit).all()
    print(airports)
    return airports
