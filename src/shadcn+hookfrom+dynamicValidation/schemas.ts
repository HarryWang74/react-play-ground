import * as z from 'zod'

/**
 * Configuration interface for controlling which fields are active
 */
export interface FieldConfiguration {
  name: boolean
}

/**
 * Base form data type
 */
export interface DynamicFormData {
  name: string
  description: string
}

/**
 * Schema configurations for different validation scenarios
 */
export const schemaConfigs = {
  name: {
    required: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name must be less than 50 characters'),
    optional: z.string().optional().default(''),
  },

  description: {
    required: z
      .string()
      .min(6, 'Description must be at least 6 characters')
      .max(500, 'Description must be less than 500 characters'),
  },
} as const

/**
 * Creates a dynamic Zod schema based on field configuration
 * Always returns DynamicFormData type for consistency
 *
 * @param config - Configuration object specifying which fields should be validated
 * @returns Zod schema for the specified configuration
 */
export function createDynamicSchema(config: FieldConfiguration) {
  if (config.name) {
    // When name is required
    return z.object({
      name: schemaConfigs.name.required,
      description: schemaConfigs.description.required,
    }) satisfies z.ZodType<DynamicFormData>
  } else {
    // When name is optional, still validate as string but allow empty
    return z
      .object({
        name: z.string().optional().default(''),
        description: schemaConfigs.description.required,
      })
      .transform((data) => ({
        name: data.name || '',
        description: data.description,
      })) satisfies z.ZodType<DynamicFormData>
  }
}

/**
 * Predefined schema configurations for common use cases
 */
export const presetSchemas = {
  /**
   * Full form with all fields required
   */
  full: createDynamicSchema({
    name: true,
  }),

  /**
   * Minimal form with only required fields
   */
  minimal: createDynamicSchema({
    name: false,
  }),

  /**
   * Name only form (description still required as it's always shown)
   */
  nameOnly: createDynamicSchema({
    name: true,
  }),
} as const

/**
 * Gets the appropriate schema based on field configuration
 *
 * @param config - Field configuration
 * @returns Zod schema for validation
 */
export function getSchemaForConfiguration(config: FieldConfiguration) {
  return createDynamicSchema(config)
}

/**
 * Validates data against a specific field configuration
 *
 * @param data - Data to validate
 * @param config - Field configuration to validate against
 * @returns Validation result
 */
export function validateFormData(
  data: Partial<DynamicFormData>,
  config: FieldConfiguration
) {
  const schema = createDynamicSchema(config)
  return schema.safeParse(data)
}

/**
 * Type guard to check if data conforms to a specific configuration
 *
 * @param data - Data to check
 * @param config - Field configuration
 * @returns Boolean indicating if data is valid
 */
export function isValidFormData(
  data: unknown,
  config: FieldConfiguration
): data is DynamicFormData {
  const result = validateFormData(data as Partial<DynamicFormData>, config)
  return result.success
}

/**
 * Helper function to get default values based on configuration
 *
 * @param config - Field configuration
 * @returns Default values object
 */
export function getDefaultValues(config: FieldConfiguration): DynamicFormData {
  return {
    name: config.name ? '' : '',
    description: '',
  }
}
