# Kanil Portfolio – Direct Morph + Contact CMS Update

## Hero morph
The large rotating hero word now uses a direct, in-place character-slot morph inspired by the supplied Loki typography animator:
- characters stay in fixed slots;
- extra characters expand/collapse when word lengths differ;
- fonts shuffle while morphing;
- characters lock left-to-right;
- the resolved word holds before the next transition.

Admin controls under **Hero & Animation**:
- Enable hero morph effect
- Auto-change words
- Shuffle font styles while morphing
- Lock letters left-to-right
- Morph duration
- Resolved word hold time
- Shuffle rhythm
- Hero font weight

The **Kanil Kanchana** name below the portrait remains a separate animation with its own enable/disable and speed control.

## Contact CMS
Under **About & Contact** you can add, remove, enable or disable:
- Email
- Phone
- GitHub
- LinkedIn
- WhatsApp
- Website
- Other links

Each item supports a label, displayed value, link/URL and icon type. Empty or disabled items are hidden from the public site.

The public Contact section shows contact cards and a compact row of contact/social icons beside the form.

## Before Git push
```powershell
npm install
npm run build
```

If the build succeeds:
```powershell
git status
git add .
git commit -m "Add direct hero morph and editable contact links"
git push origin main
```

Do not commit `.env.local`, `.next`, or `node_modules`.
