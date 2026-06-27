# Contributing to Lata Yog Routine Guide

Thank you for contributing! This repository uses a data-driven React app architecture with a central step database and a routine assembly layer.

## How to contribute

1. Fork the repository or work on a feature branch.
2. Make changes in small, focused commits.
3. Keep UI changes separate from data/database changes when possible.
4. Update documentation or tests for any significant change.
5. Run `npm run validate:data` after data updates and before opening a PR.

## Coding standards

- Use modern React hooks and functional components.
- Keep components focused on rendering; business logic belongs in hooks like `src/hooks/useRoutineRunner.js`.
- Keep data and routine definitions in `src/data/stepNames.js` and `src/data/routines.js`.
- Avoid hardcoding behavior in components when metadata can drive the UI.
- Use clear naming and preserve localized labels in `names` for English, Devanagari, and roman transliteration.

## Step database updates

- When adding or changing a step definition, update `src/data/stepNames.js`.
- Keep step keys unique and consistent across the application.
- Use `hasSides: true` only for steps that require left/right execution.
- Provide `breathPattern` and `breathAnimationKey` for pranayama steps when applicable.
- Consider adding `pranayamSteps` for structured breath cycles and progress ring rendering.
- Validate changes with `npm run validate:data`.

## Testing

- Run `npm run test` to execute unit tests.
- Run `npm run lint` to check for style and lint issues.
- Run `npm run build` to verify the production build.
- Run `npm run validate:data` to confirm step database integrity.

## PR checklist

- [ ] I updated documentation if needed.
- [ ] I added or updated tests where appropriate.
- [ ] `npm run lint` passes.
- [ ] `npm run build` succeeds.
- [ ] I ran `npm run validate:data` for database changes.

