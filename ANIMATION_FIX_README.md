# Smooth word & font animation fix

The old LokiTitle remounted the glyph whenever the font changed (`key` included the font). That restarted its entrance animation and produced a jerky/stuttering effect. Additionally, font speed was multiplied by four and the word cycle could appear stalled.

The revised LokiTitle keeps each glyph mounted. It fades the single glyph down, changes font/letter at low opacity, then fades it up. The word transitions run one character at a time, with no overlapping text layers. Admin `Word cycle speed` controls how long each complete word stays visible. `Hero font change speed` controls a separate continuous font cycle. Extremely short intervals are capped at 330ms to leave enough time for the fade; entering values below this won't make it faster. The name animation has independent settings.

## Apply

Use this ZIP as the full project, keeping your existing `.env.local` securely in your local project folder (do not commit it). Stop the server, replace the project source, then run:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm install
npm run dev
```

In `/admin/content`, use **Save changes** after adjusting sliders. A shorter **word cycle** means the current word remains on-screen for less time. A shorter **font interval** makes letters change font more frequently (down to 330ms). Try 4.5 seconds and 600ms to start.

Existing Supabase content, auth, admin, profile photo, contact inbox and meteor setup are retained.

## Verification limits

The revised TSX transpiles without syntax diagnostics, and the ZIP archive was checked. Browser interaction and a full `next build` could not be run here because the npm dependencies are not installed in this environment.
