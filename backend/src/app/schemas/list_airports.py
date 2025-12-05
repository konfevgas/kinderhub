from pydantic import BaseModel


class ListAirportsReponse(BaseModel):
    id: int
    name: str | None = None
    city: str | None = None
    country: str | None = None
    iata: str | None = None
    icao: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    altitude: int | None = None
    timezone: str | None = None

    class Config:
        from_attributes = True
