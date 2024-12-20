import shutil

# Check if there is enough free disk space (at least 400 MB)
def check_free_disk_space(required_mb=400):
    disk_usage = shutil.disk_usage(".")
    free_mb = disk_usage.free // (1024 * 1024)  # Get the free disk space in MB
    print(f"Available disk space: {free_mb} MB. Required: {required_mb} MB")
    if free_mb < required_mb:
        raise Exception(f"Not enough disk space! Required: {required_mb} MB, Available: {free_mb} MB")
    
    user_input = input(
        f"There is enough disk space ({free_mb} MB available). Do you want to proceed with the installation? (yes/no): "
    ).strip().lower()
    
    if user_input not in ['yes', 'y']:
        raise Exception("Installation cancelled by the user.")