#!/usr/bin/env python3
"""
Python Git Automation Script
Pushes the complete SidelineReel PM Assessment project to GitHub.
Repository: https://github.com/puspanDas/ajaia-product-assessment-
Author: Puspan Das
"""

import os
import sys
import subprocess

# Ensure UTF-8 output on Windows
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

REPO_URL = "https://github.com/puspanDas/ajaia-product-assessment-.git"
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

def run_cmd(cmd, check=True):
    """Run a shell command inside the project directory and print output."""
    print(f"\n[*] Executing: {' '.join(cmd)}")
    result = subprocess.run(
        cmd,
        cwd=PROJECT_DIR,
        shell=sys.platform == "win32",
        text=True,
        capture_output=True
    )
    if result.stdout.strip():
        print(result.stdout.strip())
    if result.stderr.strip() and result.returncode != 0:
        print(f"[!] Stderr: {result.stderr.strip()}")
    if check and result.returncode != 0:
        print(f"[!] Command failed with exit code {result.returncode}")
        return False, result.stdout, result.stderr
    return True, result.stdout, result.stderr

def main():
    print("=" * 65)
    print("🚀 Pushing SidelineReel PM Assessment to GitHub")
    print(f"   Target Repo: {REPO_URL}")
    print(f"   Working Dir: {PROJECT_DIR}")
    print("=" * 65)

    # 1. Initialize Git in project directory if .git doesn't exist
    git_dir = os.path.join(PROJECT_DIR, ".git")
    if not os.path.isdir(git_dir):
        print("[*] Initializing local git repository...")
        ok, _, _ = run_cmd(["git", "init"])
        if not ok:
            print("[!] Failed to initialize git.")
            sys.exit(1)
    else:
        print("[+] Local git repository already initialized.")

    # 2. Check / configure user name & email if not set
    ok, name, _ = run_cmd(["git", "config", "user.name"], check=False)
    if not name.strip():
        print("[*] Setting git user.name to 'Puspan Das'...")
        run_cmd(["git", "config", "user.name", "Puspan Das"])

    ok, email, _ = run_cmd(["git", "config", "user.email"], check=False)
    if not email.strip():
        print("[*] Setting git user.email...")
        run_cmd(["git", "config", "user.email", "puspan.das@alumni.com"])

    # 3. Add all project files (respecting .gitignore)
    print("[*] Staging all project files...")
    ok, _, _ = run_cmd(["git", "add", "-A"])
    if not ok:
        print("[!] Failed to stage files.")
        sys.exit(1)

    # 4. Commit changes
    commit_msg = "Deliverable: SidelineReel PM Assessment (Task 1 Roadmap, Task 2 Spec, Task 3 Prototype) - Puspan Das"
    print(f"[*] Committing changes: '{commit_msg}'...")
    run_cmd(["git", "commit", "-m", commit_msg], check=False)

    # 5. Ensure branch is 'main'
    print("[*] Setting branch to 'main'...")
    run_cmd(["git", "branch", "-M", "main"], check=False)

    # 6. Configure remote origin
    print("[*] Configuring remote origin...")
    run_cmd(["git", "remote", "remove", "origin"], check=False)
    ok, _, _ = run_cmd(["git", "remote", "add", "origin", REPO_URL])

    # 7. Push to GitHub
    print("\n" + "=" * 65)
    print("[*] Pushing to GitHub (main branch)...")
    print("=" * 65)
    ok, stdout, stderr = run_cmd(["git", "push", "-u", "origin", "main"], check=False)

    if not ok:
        print("\n[!] Standard push rejected (remote might contain existing commits). Attempting force push to sync...")
        ok, stdout, stderr = run_cmd(["git", "push", "-u", "origin", "main", "--force"], check=False)

    if ok:
        print("\n" + "=" * 65)
        print("🎉 SUCCESS! All files pushed to GitHub repository:")
        print(f"   {REPO_URL.replace('.git', '')}")
        print("=" * 65)
    else:
        print("\n" + "=" * 65)
        print("[!] Push encountered an authentication or remote rejection.")
        print("    If GitHub requires authentication, please ensure your Git credentials")
        print("    (Personal Access Token or GitHub Desktop/SSH) are configured.")
        print("=" * 65)

if __name__ == "__main__":
    main()
