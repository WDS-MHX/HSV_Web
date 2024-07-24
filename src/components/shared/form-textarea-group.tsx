import { Control } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Textarea } from './textArea'

interface FormGroupProps {
  control: Control<any>
  label: string
  name: string
  placeholder?: string
  inputClassName?: string
}

export default function FormTextAreaGroup({
  control,
  label,
  name,
  placeholder,
  inputClassName,
}: FormGroupProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel className='text-sm font-medium text-black'>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className={cn(inputClassName)} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
