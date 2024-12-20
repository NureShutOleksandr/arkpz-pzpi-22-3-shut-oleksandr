import sys

from nodejs_installer import nodejs_setup
from check_database_password import prompt_password
from check_free_disk_space import check_free_disk_space
from packages_install import run_npm_install
from run_server import run_npm_run_dev

# Main entry point for downloading, installing, and verifying Node.js
def main():
    try:
        check_free_disk_space()
        prompt_password()
        nodejs_setup()
        run_npm_install()
        run_npm_run_dev()
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()