# README screenshots

Copies of screenshots from `../`, normalised to a **1.879 aspect ratio** (the ratio of
the most common capture size, 1870x995).

The engine README at
[doriaxengine/doriax](https://github.com/doriaxengine/doriax#readme) lays its screenshots
out in a grid with `width="48%"`. The originals come from several different capture
resolutions (ratios 1.607 to 1.944), so that grid rendered with tiles of visibly
different heights. These copies all share one ratio, so the tiles come out identical.

Nothing on the website uses this directory — the site uses the originals in `../`.

| File | Original | Here | Change |
| --- | --- | --- | --- |
| `editor-office-scene.png` | 1526x785 | 1526x812 | padded height with the edge colour |
| `editor-ai-chat.png` | 1808x948 | 1808x962 | padded height with the edge colour |
| `editor-code.png` | 2244x1268 | 2244x1194 | trimmed the status bar and empty panel space |
| `runtime-first-ui-scene.png` | 1869x1163 | 1869x994 | cut below the viewport, then padded back out |

Padding uses each image's own top/bottom edge colour, so it reads as a slightly taller
menu or status bar. No image is stretched and nothing is cropped from the sides.

If you replace one of these, keep the ratio at 1.879 (`width / height`) or the grid will
go uneven again.
