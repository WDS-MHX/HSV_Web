import { ReadonlyURLSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useCreateQueryString = (searchParams: ReadonlyURLSearchParams) =>
  useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )
