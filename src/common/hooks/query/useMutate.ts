import { AxiosError } from "axios";

import { MutationOptions, QueryKey, useMutation } from "@tanstack/react-query";

interface Props extends MutationOptions {
  queryKey?: QueryKey;
}

const useMutate = (options: Props) => {
  return useMutation({
    ...options,
    onError: (error: AxiosError) => {
      if (error instanceof AxiosError && error.response) {
        const { error: errorMessage } = error.response?.data as any;
        throw new Error(errorMessage);
      } else if (error?.request) {
        throw new Error(
          error.message || "No response received from the server"
        );
      } else {
        throw new Error("An Unknown error occurred");
      }
    },
  });
};

export default useMutate;
