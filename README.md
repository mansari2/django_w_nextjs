# Scout Technical Exercise (Sr Back-end)

## Intro

Introduction video: https://drive.google.com/file/d/1KlPYZfZEVaBqDU0AbiXGgz_zmAV-Lhl3/view?usp=drive_link

![assessment screenshot](https://teamupsgeneral.blob.core.windows.net/teamupspublic/sr-backend-v3/doc-analysis.png)

## Quick start

1. Clone the repo: `git clone {REPO_URL}`

1. CD into the repo: `cd /path/to/repo`

1. Start via docker compose: `docker-compose up` ([walkthrough video](https://www.loom.com/share/afd822145a384b449cd8275cd374fb7f?sid=7069ccb0-3880-45b6-afa1-72ad28a284eb)).

1. Once running, visit `http://localhost:3000/` to load the app--the first load might be slow. You should see the following page if everything is successful.
   ![assessment home screenshot](https://teamupsgeneral.blob.core.windows.net/teamupspublic/sr-backend-v3/doc-analysis-home.png)

## Sample git workflow

Here is a sample flow for making changes and submitting a PR after completing the exercise:

```
// check out a new branch for your changes
git checkout -b {BRANCH_NAME}

// make changes and commit them
git add --all
git commit

// push new branch up to GitHub
git push origin {BRANCH_NAME}

// use GitHub to make PR
// (DO NOT MERGE PR)
```
