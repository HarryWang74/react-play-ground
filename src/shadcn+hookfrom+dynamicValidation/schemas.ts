import * as z from 'zod'

// form display state
export interface FieldConfiguration {
  name: boolean
  description: boolean
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
    optional: z.string().optional().default(''),
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
  const nameSchema = config.name
    ? schemaConfigs.name.required
    : schemaConfigs.name.optional
  const descriptionSchema = config.description
    ? schemaConfigs.description.required
    : schemaConfigs.description.optional

  return z
    .object({
      name: nameSchema,
      description: descriptionSchema,
    })
    .transform((data) => ({
      name: data.name || '',
      description: data.description || '',
    })) satisfies z.ZodType<DynamicFormData>
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
    description: true,
  }),

  /**
   * Minimal form with only required fields
   */
  minimal: createDynamicSchema({
    name: false,
    description: false,
  }),

  /**
   * Name only form (description optional)
   */
  nameOnly: createDynamicSchema({
    name: true,
    description: false,
  }),

  /**
   * Description only form (name optional)
   */
  descriptionOnly: createDynamicSchema({
    name: false,
    description: true,
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
 * @returns Default values object
 */
export function getDefaultValues(): DynamicFormData {
  return {
    name: '',
    description: '',
  }
}
