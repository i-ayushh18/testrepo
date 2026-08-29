"""Simple greeting module providing a hello_world function."""

from __future__ import annotations

HELLO_MESSAGE: str = "Hello, World!"

def hello_world() -> str:
    """Return a standard greeting."""
    return HELLO_MESSAGE

if __name__ == "__main__":
    print(hello_world())
