import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useClaimAirDrop = () => {
  return useMutation({
    mutationKey: ["/POST /claim/airdop"],
    mutationFn: async () => {
      const currentTag = [
        {
          name: "Action",
          value: "Airdrop",
        },
      ];

      const mutate = await message({
        process: process.env.VITE_DEV_DUMPET_TOKEN_TXID || "",
        tags: currentTag,
        signer: createDataItemSigner(window.arweaveWallet),
      });

      const response = await result({
        message: mutate,
        process: process.env.VITE_DEV_DUMPET_TOKEN_TXID || "",
      });

      const hasError = response.Messages[0]?.Tags.find(
        (tag: { name: string }) => tag.name === "Error"
      );

      if (hasError) {
        throw new Error(response.Messages[0]?.Data);
      }

      return true;
    },

    onSuccess: () => {
      toast(`Airdop Claimed Successfully`, {
        position: "top-center",
        style: {
          background: "#38A068",
          color: "white",
        },
      });
    },

    onError: (error) => {
      toast(error.message || "Something went wrong", {
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "white",
        },
      });
    },
  });
};

export default useClaimAirDrop;
