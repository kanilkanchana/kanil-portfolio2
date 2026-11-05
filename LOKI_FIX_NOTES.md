# Loki text fix

Compared against https://codepen.io/edalgrin/pen/oNZOgJW.

Previous issue: the generated CSS used `animation: ... 10s forwards`, so it
finished once and always appeared static afterward. Its long-name keyframe
percentages could also go negative.

Now each letter receives its own **font-family**, **text-transform**, and
**translate** values during a repeating 9.9-second cycle (32 rolling frames
and 13 rest frames, 220ms each). Letters settle progressively, then repeat.
This does not animate or modify the profile image.

To view: `npm install && npm run dev`, open localhost:3000 and watch for 10s.
If stale, stop server, delete `.next`, restart and hard refresh Ctrl+Shift+R.
If your OS requests reduced motion, the text stays readable and static.
