import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '../components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { presetSchemas, validateFormData } from './schemas'
import type { DynamicFormData, FieldConfiguration } from './schemas'

/**
 * Demo component showcasing React Hook Form with shadcn/ui and dynamic schema validation from separate file
 */
function Demo() {
  const [submittedData, setSubmittedData] = useState<DynamicFormData | null>(
    null
  )

  // Control state for which fields to show
  const [fieldControls, setFieldControls] = useState<FieldConfiguration>({
    name: true, // Control for single name field
    description: true, // Control for description field
  })

  // Dynamic validation schema based on field controls - using external schema file
  const createFormSchema = useCallback((config: FieldConfiguration) => {
    if (config.name && config.description) {
      return presetSchemas.full
    } else if (config.name && !config.description) {
      return presetSchemas.nameOnly
    } else if (!config.name && config.description) {
      return presetSchemas.descriptionOnly
    } else {
      return presetSchemas.minimal
    }
  }, [])

  const formSchema = createFormSchema(fieldControls)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange' as const,
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    reset,
  } = form

  const onSubmit = (data: Record<string, unknown>) => {
    console.log('Form submitted:', data)

    // Validate with current configuration using external schema
    const validationResult = validateFormData(data, fieldControls)

    if (validationResult.success) {
      const submissionData: DynamicFormData = {
        name: fieldControls.name ? String(data.name || '') : '',
        description: fieldControls.description
          ? String(data.description || '')
          : '',
      }
      setSubmittedData(submissionData)
    } else {
      console.error('Validation failed:', validationResult.error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Form Section - Left Column */}
        <div className="space-y-6 min-w-0">
          <h1>Dynamic Schema Form</h1>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field - Conditional */}
              {fieldControls.name && (
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Description Field - Conditional */}
              {fieldControls.description && (
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter description" {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe the main task or objective (6-500 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Form Status */}
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Form Status:</h3>
                <div className="text-sm space-y-1">
                  <p>
                    Valid:{' '}
                    <span
                      className={isValid ? 'text-green-600' : 'text-red-600'}
                    >
                      {isValid ? 'Yes' : 'No'}
                    </span>
                  </p>
                  <p>
                    Dirty:{' '}
                    <span
                      className={isDirty ? 'text-blue-600' : 'text-gray-600'}
                    >
                      {isDirty ? 'Yes' : 'No'}
                    </span>
                  </p>
                  <p>
                    Schema Type:{' '}
                    <span className="text-blue-600">
                      {fieldControls.name && fieldControls.description
                        ? 'Full (name + description required)'
                        : fieldControls.name && !fieldControls.description
                        ? 'Name Only (description optional)'
                        : !fieldControls.name && fieldControls.description
                        ? 'Description Only (name optional)'
                        : 'Minimal (both optional)'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={!isValid}>
                  Submit Form
                </Button>
                <Button type="button" variant="outline" onClick={() => reset()}>
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>

          {/* Display submitted data */}
          {submittedData && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Form Successfully Submitted!
              </h3>
              <div className="space-y-2 text-sm">
                {submittedData.name && (
                  <div>
                    <strong className="text-green-800">Name:</strong>
                    <span className="ml-2 text-green-700">
                      {submittedData.name}
                    </span>
                  </div>
                )}
                {submittedData.description && (
                  <div>
                    <strong className="text-green-800">Description:</strong>
                    <span className="ml-2 text-green-700">
                      {submittedData.description}
                    </span>
                  </div>
                )}
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-green-800 font-medium">
                  View Raw JSON
                </summary>
                <pre className="text-xs text-green-700 bg-green-100 p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* Controls Section - Right Column */}
        <div className="space-y-6 min-w-0">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Schema Configuration</h2>
            <p className="text-muted-foreground">
              Toggle field validation to see dynamic schema changes
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border h-fit sticky top-6">
            <div className="space-y-4">
              <h3 className="font-medium">Field Controls</h3>
              <div className="flex flex-col gap-3">
                {/* Name Control */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={fieldControls.name}
                    onChange={(e) => {
                      setFieldControls({
                        ...fieldControls,
                        name: e.target.checked,
                      })
                    }}
                    className="rounded"
                  />
                  <span>Enable Name Validation</span>
                </label>

                {/* Description Control */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={fieldControls.description}
                    onChange={(e) => {
                      setFieldControls({
                        ...fieldControls,
                        description: e.target.checked,
                      })
                    }}
                    className="rounded"
                  />
                  <span>Enable Description Validation</span>
                </label>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded border">
                <h4 className="text-sm font-medium text-blue-800">
                  Current Schema Rules:
                </h4>
                <div className="text-xs text-blue-700 mt-1 space-y-1">
                  {fieldControls.name ? (
                    <div>• Name: Required (1-50 chars)</div>
                  ) : (
                    <div>• Name: Optional (not validated)</div>
                  )}
                  {fieldControls.description ? (
                    <div>• Description: Required (6-500 chars)</div>
                  ) : (
                    <div>• Description: Optional (not validated)</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo
