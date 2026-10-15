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

- Keep the proposal's transient state and audio playback in browser-side React state; no personal answers need server persistence.
- Store uploaded audio and downloaded GIFs as Lovable Assets pointers; generated background artwork is imported from the project.
- Define the proposal palette and envelope geometry in the global stylesheet; use the shared Button for all controls.
