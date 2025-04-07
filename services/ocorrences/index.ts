import { useMutation } from "@tanstack/react-query"
import type { SubmitPersonInformationOptions, SubmitPersonInformationParams } from "./types"
import { submitPersonInformation } from "./service"

export function useSubmitPersonInformation(
  options?: SubmitPersonInformationOptions,
) {
  return useMutation({
    mutationFn: submitPersonInformation,
    ...options,
  })
}

