#!/usr/bin/env python3

import os
import sys
import requests
import subprocess
import time
import winreg

# Downloads the Node.js .msi installer for a given version
def download_nodejs_msi(version="20.5.0"):
    url = f"https://nodejs.org/dist/v{version}/node-v{version}-x64.msi"
    file_name = f"node-v{version}-x64.msi"
    print(f"Downloading Node.js {version}...")

    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(file_name, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"File {file_name} downloaded successfully.")
        return file_name
    else:
        raise Exception(f"Download error: {response.status_code}")

# Installs the Node.js .msi file using msiexec
def install_msi(file_name):
    print(f"Starting installation of {file_name}...")
    try:
        process = subprocess.Popen(
            ["msiexec", "/i", file_name, "/quiet", "/norestart"],
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        stdout, stderr = process.communicate()
        if process.returncode == 0:
            print("Installation completed successfully.")
        else:
            error_message = stderr.decode().strip()
            print(f"Installation error: {error_message}")
            raise Exception(f"msiexec returned exit code {process.returncode}")
    except Exception as e:
        print(f"Installation error: {e}")
        raise

# Retrieves the full PATH environment variable on Windows
def get_windows_path():
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Environment') as key:
            user_path, _ = winreg.QueryValueEx(key, 'Path')
    except FileNotFoundError:
        user_path = ''

    try:
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r'SYSTEM\CurrentControlSet\Control\Session Manager\Environment') as key:
            system_path, _ = winreg.QueryValueEx(key, 'Path')
    except FileNotFoundError:
        system_path = ''

    if user_path and system_path:
        full_path = system_path + ';' + user_path
    elif system_path:
        full_path = system_path
    else:
        full_path = user_path

    return full_path

# Updates the PATH environment variable in the current session
def update_env():
    try:
        full_path = get_windows_path()
        os.environ['PATH'] = full_path
        print("Environment PATH updated.")
    except Exception as e:
        print(f"Failed to update environment PATH: {e}")
        raise

# Verifies if Node.js is installed and prints the version
def verify_installation():
    try:
        result = subprocess.check_output(["node", "-v"], shell=True, text=True)
        print(f"Node.js is installed: version {result.strip()}")
    except FileNotFoundError:
        print("Node.js is not installed. Check the installation process.")
    except subprocess.CalledProcessError as e:
        print(f"Error during Node.js installation check: {e}")

# Main entry point for downloading, installing, and verifying Node.js
def install_nodejs(version="20.5.0"):
    try:
        file_name = download_nodejs_msi(version)
        install_msi(file_name)
        update_env()
        node_js_bin = r'C:\Program Files\nodejs'
        if node_js_bin not in os.environ['PATH']:
            os.environ['PATH'] += os.pathsep + node_js_bin
            print(f"Added '{node_js_bin}' to PATH.")
        else:
            print(f"'{node_js_bin}' is already in PATH.")
        verify_installation()
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

