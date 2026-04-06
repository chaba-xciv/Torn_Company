## 2024-04-06 - Batching DOM Updates in Vanilla JS
**Learning:** Calling `insertAdjacentHTML` repeatedly inside a loop triggers layout thrashing and expensive DOM reflows and repaints in vanilla JavaScript projects. This has a significant performance cost on rendering large lists.
**Action:** Concatenate HTML strings in memory inside the loop, and update the `.innerHTML` property of the container element exactly once outside the loop.
