#!/usr/bin/env python3

from nodejs_installer import nodejs_setup
from check_database_password import prompt_password

# Main entry point for downloading, installing, and verifying Node.js
def main():
    prompt_password()
    nodejs_setup()

if __name__ == "__main__":
    main()