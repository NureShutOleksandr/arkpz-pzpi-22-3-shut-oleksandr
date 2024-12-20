import subprocess
import os

# Run npm install in the server directory
def run_npm_install():
    server_dir = os.path.join(os.path.dirname(__file__), "server")
    
    try:
        print(f"Running 'npm install' in {server_dir}...")
        result = subprocess.run("npm i", cwd=server_dir, check=True, text=True, capture_output=True, shell=True)
        print("npm install completed successfully:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error during 'npm install': {e.stderr}")
        raise