"""
Simple demo module for greeting output.

This module provides a pure function that returns a greeting string,
allowing callers to decide how to handle output.
"""

from __future__ import annotations


def hello_world() -> str:
    """Return a friendly greeting."""
    return "Hello, World!"


if __name__ == "__main__":
    print(hello_world())
