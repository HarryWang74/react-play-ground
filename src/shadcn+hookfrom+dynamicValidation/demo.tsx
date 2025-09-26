import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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

// Validation schema for the dynamic form
const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters'),
})

type DynamicFormData = z.infer<typeof formSchema>

/**
 * Demo component showcasing React Hook Form with shadcn/ui and dynamic field arrays
 */
function Demo() {
  const [submittedData, setSubmittedData] = useState<DynamicFormData | null>(
    null
  )

  // Control state for which fields to show
  const [fieldControls, setFieldControls] = useState({
    name: true, // Control for single name field
  })

  const form = useForm<DynamicFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
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

  const onSubmit = (data: DynamicFormData) => {
    console.log('Form submitted:', data)
    setSubmittedData(data)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Form Section - Left Column */}
        <div className="space-y-6">
          <h1>Form</h1>
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

              {/* Description Field - Always visible */}
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
                      Describe the main task or objective
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    Total Fields:{' '}
                    <span className="text-blue-600">
                      {(fieldControls.name ? 1 : 0) + 1} (Name:{' '}
                      {fieldControls.name ? 1 : 0}, Description: 1)
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
                <div>
                  <strong className="text-green-800">Description:</strong>
                  <span className="ml-2 text-green-700">
                    {submittedData.description}
                  </span>
                </div>
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
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Check/uncheck the Name field to add or remove it from the form
              dynamically
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border h-fit sticky top-6">
            <div className="space-y-4">
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
                  <span>Name</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo
