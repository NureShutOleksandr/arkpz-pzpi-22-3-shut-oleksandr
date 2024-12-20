import sys
import subprocess
import os

# Run 'npm run dev' to start the server
def run_npm_run_dev():
    server_dir = os.path.join(os.path.dirname(__file__), "server")
    
    try:
        print(f"Running 'npm run dev' in {server_dir}...")
        result = subprocess.run("npm run dev", cwd=server_dir, check=True, text=True, capture_output=True, shell=True)
        print("Server started successfully:")
        print(result.stdout)
        print("\nServer is running. You should be able to access it now.")
    except subprocess.CalledProcessError as e:
        print(f"Error during 'npm run dev': {e.stderr}")
        raise
    except KeyboardInterrupt:
        print("\nServer stopped by user (Ctrl+C).")
        sys.exit(0)