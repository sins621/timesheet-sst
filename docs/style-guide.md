# Style Guide

## Naming Conventions

- The project uses 'kebab-case' for file names e.g. `file-name.ts` and `file-name.tsx`.
- The project uses 'camelCase' for symbol names.
- The project uses 'PascalCase' for Type names.
- The project uses 'ALL_CAPS' for constant names.
- All functions are to be exported as constants containing thunks `() => {}` with the exception of components because Next.js requires routes to export default functions for root route components and I don't want to do `const SomeComponent = () => {}` and then `exoprt default SomeComponent` or whatever the syntax is.
- Enums will be used however, they should only be used in 'type' keys in objects as the values of these enums are not to be used. If the value is to be used then a constants should be declared instead.
