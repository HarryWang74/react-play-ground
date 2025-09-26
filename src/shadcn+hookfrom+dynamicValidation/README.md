# Dynamic Form Demo

This demo showcases a dynamic form with field arrays using React Hook Form, shadcn/ui components, and Zod validation.

## Features

- **Dynamic Name Fields**: Add or remove name fields as needed
- **Dynamic Assignment Fields**: Add or remove assignment fields as needed
- **Task Field**: Single required task description field
- **Real-time Validation**: Form validation with Zod schema
- **Form State Management**: Built-in form state tracking (valid, dirty, errors)
- **Responsive Design**: Clean UI with Tailwind CSS styling

## Form Structure

```typescript
interface FormData {
  names: Array<{ value: string }> // Dynamic array of names
  assigns: Array<{ value: string }> // Dynamic array of assignments
  task: string // Single task description
}
```

## Validation Rules

- **Names**: 1-50 characters each, at least one required
- **Assignments**: 1-100 characters each, at least one required
- **Task**: 1-500 characters, required

## Usage

1. **Adding Fields**: Click "Add Name" or "Add Assignment" buttons
2. **Removing Fields**: Click "Remove" button next to any field (minimum 1 required)
3. **Form Submission**: Fill all fields and click "Submit Form"
4. **Reset**: Clear all fields with "Reset Form" button

## Key Technologies

- React Hook Form with `useFieldArray` for dynamic fields
- Zod for schema validation
- shadcn/ui components for consistent styling
- TypeScript for type safety
