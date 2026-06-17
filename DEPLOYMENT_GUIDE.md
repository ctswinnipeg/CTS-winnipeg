# How to Edit & Launch Your Website (Free)

---

## Step 1: Install These 3 Things

1. **Node.js** → https://nodejs.org (click the big green LTS button)
2. **VS Code** → https://code.visualstudio.com
3. **Git** → https://git-scm.com/downloads

Restart your computer after installing all three.

---

## Step 2: Open the Project

1. Download this project as a ZIP and unzip it
2. Open VS Code
3. File → Open Folder → select the unzipped folder

---

## Step 3: Run It on Your Computer

1. In VS Code, open the terminal: **View → Terminal**
2. Type these two commands:

```
npm install
npm run dev
```

3. Click the link that appears (http://localhost:5173)
4. Your website is now running in your browser!

---

## Step 4: Edit What You Need

Save any file (`Ctrl + S`) and the browser updates instantly.

| To change...             | Open this file                     |
|--------------------------|------------------------------------|
| Eventbrite link          | `src/components/Hero.tsx`          |
| Speaker names            | `src/components/Speakers.tsx`      |
| FAQ questions            | `src/components/FAQ.tsx`           |
| Phone / Email            | `src/components/Contact.tsx`       |
| Event date               | `src/components/Countdown.tsx`     |
| Page title               | `index.html`                       |

---

## Step 5: Put It Online (Free with Vercel)

### A. Create a GitHub account
Go to https://github.com → Sign up

### B. Upload your code to GitHub
In the VS Code terminal, run these one at a time:

```
git init
git add .
git commit -m "my website"
```

Then go to GitHub, click the **+** icon → **New repository** → name it `church-tech-summit` → **Create repository**.

Copy the two lines GitHub shows you that start with `git remote...` and `git push...` and paste them into your VS Code terminal.

### C. Deploy on Vercel
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Click **Add New Project**
4. Select your `church-tech-summit` repo
5. Click **Deploy**
6. Done — your site is live!

---

## Updating After Launch

Every time you make changes:

```
git add .
git commit -m "updated site"
git push
```

Vercel automatically publishes the new version.

---

## Total Cost: $0
