#!/usr/bin/env python3
"""
SidelineReel Seamless Application Runner
Author: Puspan Das, Product Manager Assessment
Ajaia / SidelineReel

Usage:
    python run_app.py              # Starts server & opens browser once (no duplicate tabs if already running)
    python run_app.py --check      # Silently checks if app is running (does NOT open browser)
    python run_app.py --no-open    # Starts server without opening any browser tab
    python run_app.py --test       # Runs full HTTP & asset health verification
"""

import sys
import os
import time
import socket
import subprocess
import urllib.request
import webbrowser
import argparse

# Ensure standard UTF-8 console output on Windows
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 5173
APP_URL = f"http://localhost:{DEFAULT_PORT}/"
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

def is_port_in_use(host=DEFAULT_HOST, port=DEFAULT_PORT):
    """Check if the target port is currently accepting TCP connections."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.6)
        return s.connect_ex((host, port)) == 0

def is_server_healthy(url=APP_URL):
    """Check if the server responds to HTTP GET requests."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "SidelineReel-HealthCheck/1.0"})
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.status == 200
    except Exception:
        return False

def wait_for_server(url=APP_URL, timeout=15):
    """Wait until server is ready and serving HTTP traffic."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        if is_server_healthy(url):
            return True
        time.sleep(0.3)
    return False

def run_health_test():
    """Verify all critical application assets and dependencies."""
    print("=" * 65)
    print("[*] SidelineReel Application Health & Integrity Test")
    print("=" * 65)

    files_to_check = [
        "index.html",
        "src/style.css",
        "src/app.js",
        "package.json",
        "public/soccer_highlight_action.jpg",
        "public/soccer_player_four.jpg",
        "public/team_recap_celebration.jpg",
        "public/youth_lacrosse_action.jpg",
        "SUBMISSION.md",
        "PRESENTATION_SCRIPT.md"
    ]

    all_ok = True
    for rel_path in files_to_check:
        full_path = os.path.join(PROJECT_DIR, rel_path)
        exists = os.path.isfile(full_path)
        size = os.path.getsize(full_path) if exists else 0
        status = f"[OK] ({size:,} bytes)" if exists else "[MISSING]"
        if not exists:
            all_ok = False
        print(f"  * {rel_path:<40} {status}")

    print("-" * 65)
    is_running = is_server_healthy(APP_URL)
    print(f"  * Server Status ({APP_URL}): {'[ACTIVE]' if is_running else '[STOPPED]'}")
    print("=" * 65)
    return all_ok

def start_server_seamlessly(open_browser=True):
    """Start the Vite development server without spamming browser tabs."""
    already_running = is_port_in_use() or is_server_healthy()

    if already_running:
        print("\n" + "=" * 65)
        print(f"[+] SidelineReel is ALREADY RUNNING at: {APP_URL}")
        print("    (Skipped opening duplicate tab - your server is ready!)")
        print("=" * 65 + "\n")
        return

    print("\n" + "=" * 65)
    print("[*] Starting SidelineReel Development Server...")
    print(f"    Directory: {PROJECT_DIR}")
    print("=" * 65)

    cmd = ["npm", "run", "dev"]
    shell = sys.platform == "win32"

    try:
        proc = subprocess.Popen(
            cmd,
            cwd=PROJECT_DIR,
            shell=shell,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
    except FileNotFoundError:
        print("[!] Error: 'npm' was not found in PATH. Please ensure Node.js is installed.")
        return

    print("[*] Waiting for Vite server to initialize...")
    ready = wait_for_server(APP_URL, timeout=12)

    if ready:
        print("\n" + "=" * 65)
        print(f"[+] SidelineReel is LIVE at: {APP_URL}")
        print("=" * 65)

        if open_browser:
            print("[*] Opening single browser tab for presentation...")
            webbrowser.open(APP_URL)
        else:
            print("[*] Browser launch skipped (--no-open flag active).")

        print("\n[Press Ctrl+C in terminal to stop server]\n")

        try:
            for line in proc.stdout:
                line_clean = line.strip()
                if line_clean:
                    print(f"  [vite] {line_clean}")
        except KeyboardInterrupt:
            print("\n[*] Shutting down SidelineReel server gracefully...")
            proc.terminate()
            proc.wait()
            print("[+] Server stopped.")

    else:
        print("[!] Server launch timed out. Last logs:")
        proc.terminate()
        for _ in range(10):
            line = proc.stdout.readline()
            if line:
                print("  ", line.strip())

def main():
    parser = argparse.ArgumentParser(description="SidelineReel Seamless App Runner")
    parser.add_argument("--check", action="store_true", help="Check server health silently without opening browser")
    parser.add_argument("--no-open", action="store_true", help="Start server without opening browser tab")
    parser.add_argument("--test", action="store_true", help="Run comprehensive asset and integrity health check")
    args = parser.parse_args()

    if args.test:
        run_health_test()
        return

    if args.check:
        healthy = is_server_healthy(APP_URL)
        port_open = is_port_in_use(DEFAULT_HOST, DEFAULT_PORT)
        print(f"Port 5173 listening: {port_open}")
        print(f"HTTP GET {APP_URL}: {'200 OK' if healthy else 'Unreachable'}")
        sys.exit(0 if healthy else 1)

    start_server_seamlessly(open_browser=not args.no_open)

if __name__ == "__main__":
    main()
