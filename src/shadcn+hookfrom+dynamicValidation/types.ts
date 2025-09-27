/**
 * Form display state configuration
 * Controls which fields are shown and validated in the dynamic form
 */
export interface FieldConfiguration {
  name: boolean
  description: boolean
}

/**
 * Base form data type
 * Represents the structure of form data after validation and transformation
 */
export interface DynamicFormData {
  name: string
  description: string
}
