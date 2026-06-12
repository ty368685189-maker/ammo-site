# Logo assets

This folder stores optional logo images for the homepage mark strip.

Use these folders:

- `schools/` for university logos
- `organizations/` for company, institute, and group logos

Recommended formats:

- Prefer `svg` when the official source provides it.
- Use transparent `png` when `svg` is not available.
- Avoid low-resolution screenshots when possible.

Recommended names:

- `schools/北京理工大学.png`
- `schools/南京理工大学.png`
- `schools/中北大学.png`
- `organizations/norinco-group.jpg`
- `organizations/north-special-energy.png`
- `organizations/auto58.jpg`

After adding a file, update the matching item in `src/views/HomePage.vue`:

```ts
{ name: '北京理工大学', logo: '/logos/schools/北京理工大学.png' }
```

If `logo` is omitted, the homepage keeps showing the text mark.
