<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the floating navigation's active and hover highlight as one measured element inside the links list, so transitions glide without changing link geometry or theme controls.
- Use the accessible mobile navigation popover below the desktop link breakpoint; keep its controls visible and close it after navigation to prevent narrow-screen overflow.

- Faculty portraits use CDN asset pointers and consistent, lazy-loaded portrait frames to keep the directory lightweight and visually stable.
- Keep native wheel and touch scrolling; the shared motion manager pauses offscreen decorations and paint-heavy effects during scrolling to preserve the frame budget.
- Keep pathway card decoration CSS-only and registered with the shared motion manager so card interactions do not add scrolling listeners or animation loops.
- Keep tap feedback in one noninteractive root overlay with bounded, short-lived layers and the shared scroll ticker, so existing control geometry and native touch scrolling remain unchanged.
