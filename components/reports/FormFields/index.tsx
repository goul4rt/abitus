"use client"

import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { TextareaFieldProps, DateFieldProps } from "./types"

export function TextareaField({
  name,
  control,
  label,
  placeholder,
  rows = 5,
  isRequired = false,
  hasError = false,
  errorMessage
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={name} 
        className={cn(hasError && "text-destructive")}
      >
        {label} {isRequired && <span aria-hidden="true">*</span>}
        {isRequired && <span className="sr-only">obrigatório</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Textarea
            id={name}
            placeholder={placeholder}
            rows={rows}
            className={cn(hasError && "border-destructive")}
            aria-required={isRequired ? "true" : "false"}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...field}
          />
        )}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-destructive" id={`${name}-error`} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export function DateField({
  name,
  control,
  label,
  placeholder,
  maxDate,
  isRequired = false,
  hasError = false,
  errorMessage
}: DateFieldProps) {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={name} 
        className={cn(hasError && "text-destructive")}
      >
        {label} {isRequired && <span aria-hidden="true">*</span>}
        {isRequired && <span className="sr-only">obrigatório</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            id={name}
            type="date"
            placeholder={placeholder}
            max={maxDate}
            className={cn(hasError && "border-destructive")}
            aria-required={isRequired ? "true" : "false"}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...field}
          />
        )}
      />
      {hasError && errorMessage && (
        <p className="text-sm text-destructive" id={`${name}-error`} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default {
  TextareaField,
  DateField
} 