# in component

- set from display state
- set default value
- set from schema by form display state - method is from schema
- set form state from react form api
- enable/disable submit button by isValid
- destructuring react hook from

```tsx
const {
  control,
  handleSubmit,
  formState: { isValid, isDirty },
  reset,
} = form
```

# in schemas

## basic schema

- required when display is ture
- optional when display is false

create dynamic schema

- read display state
- condition assign required/optional
