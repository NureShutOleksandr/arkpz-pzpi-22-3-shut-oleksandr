#!/usr/bin/env python3

import sys
import getpass

# Prompts the user for the database password
def prompt_password():
    while True:
        db_password = getpass.getpass("Enter the database password (or type 'cancel' to exit): ")
        if db_password.lower() == 'cancel':
            print("Password entry cancelled.")
            sys.exit(0)
        elif db_password != '12345':  # Replace with your actual password
            print("Incorrect password. Try again.")
        else:
            print("Password accepted.")
            break