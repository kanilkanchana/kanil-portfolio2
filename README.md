# Kanil Kanchana Portfolio — GitHub Pages

## Folder names
- Profile photo: `assets/images/profile/kanil-profile.png`
- Project photos: `assets/images/projects/project-01.jpg`, `project-02.jpg`, `project-03.jpg`
- Hero background video: `assets/videos/portfolio-background.mp4`

Images/video are not included: copy your own files into these locations. In the editor, you can change any image path. The hero portrait is styled with `object-fit: contain` to minimize cropping. For project photos use JPG/PNG/WebP and paste their relative path into the project image field.

## Publish on GitHub Pages
1. Create a **public** GitHub repository (for example `kanil-portfolio`).
2. Upload all files and folders from this ZIP to the repository root.
3. Go to Settings > Pages > Build and deployment; choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. Public website: `https://YOUR-USERNAME.github.io/kanil-portfolio/`
5. Separate editor URL: `https://YOUR-USERNAME.github.io/kanil-portfolio/admin/`

## Editing and publishing
- Open `/admin/` to edit your profile, social URLs, project descriptions/images, skills, tools, education, experience and theme.
- Changes are saved in **your browser only** until you publish them.
- In **Backup & Publish**, click **Download site-data.json for GitHub publishing**.
- In your GitHub repository replace the existing `site-data.json` with the downloaded file and commit. Your public page loads this JSON, so visitors will then see the new data.
- For new/replaced images, upload the image to the matching `assets/images/...` folder in GitHub, commit, and enter its path in the editor.
- For profile photos, enter `assets/images/profile/kanil-profile.png` or another path in Profile & About.
- Browser localStorage is per browser/device; use JSON import/export to move changes between devices.

## Security
**Important: `/admin/` is NOT a private or authenticated dashboard.** GitHub Pages hosts static files and cannot protect an admin route with a secure login or write changes directly to the repository. Anyone who knows the URL can open the editor and change their *own local copy*, but they cannot publish changes to your GitHub repository without GitHub write access. Keep your GitHub account protected with 2FA.

If you need an actual password-protected admin that publishes changes instantly, use an authenticated CMS or a backend (e.g. Decap CMS with a compatible OAuth provider, or Supabase/Firebase auth + storage). Do not place GitHub access tokens in website JavaScript.

## Cinematic refresh
The provided photo is included and transparent padding has been trimmed, without cropping the actual person. The top page follows the dark charcoal/orange reference layout. Social icons use the URLs in site-data.json, and fall back to the Contact section if no URL is set.


## Social URLs — fixed
The public social icons now open actual URLs in a new tab. Unconfigured icons are hidden (they no longer jump to #contact).
1. Open /admin/ and edit **Profile & About**. Paste full links, for example `https://www.linkedin.com/in/YOUR-HANDLE/`.
2. In **Backup & Publish**, click **Download site-data.json for GitHub publishing**.
3. Replace the repository's `site-data.json` on GitHub, commit changes to `main`.
4. Hard-refresh the live site (`Ctrl+Shift+R`).
GitHub Pages does not automatically receive browser-local dashboard edits. Do not upload an entire ZIP just to change links.
