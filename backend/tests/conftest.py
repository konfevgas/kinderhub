import sys
from pathlib import Path

# backend/
ROOT_DIR = Path(__file__).resolve().parents[1]

# backend/src
SRC_DIR = ROOT_DIR / "src"

# Put backend/src at the beginning of sys.path
sys.path.insert(0, str(SRC_DIR))
