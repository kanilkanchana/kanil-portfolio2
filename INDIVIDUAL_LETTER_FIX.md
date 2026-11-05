# Individual letter font animation fix

The previous version used one shared `fontTick`, so every letter recalculated its font at the same time.

This version stores a separate font index for every character position. On each font tick only one visible character advances to its next font. For example, `Backend` changes in this order: `B`, then `a`, then `c`, then `k`, etc. The loop then starts again from the first character.

Word changes such as `Web Apps -> Python` remain letter-by-letter and pause the font loop while the word is morphing, preventing two effects from fighting each other.
