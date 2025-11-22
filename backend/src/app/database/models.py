from __future__ import annotations

from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.connection import Base


class Airports(Base):
    __tablename__ = "airports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    iata: Mapped[str | None] = mapped_column(String(3), nullable=True, unique=True, index=True)
    icao: Mapped[str | None] = mapped_column(String(4), nullable=True, unique=True, index=True)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    elevation: Mapped[int | None] = mapped_column(Integer, nullable=True)
    utc_offset: Mapped[int | None] = mapped_column(Integer, nullable=True)
    dst: Mapped[str | None] = mapped_column(String(1), nullable=True)
    timezone: Mapped[str | None] = mapped_column(String(64), nullable=True)
    airport_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    source: Mapped[str | None] = mapped_column(String(255), nullable=True)

    def __repr__(self) -> str:
        return f"<Airport id={self.id} name={self.name!r} iata={self.iata!r} icao={self.icao!r}>"
