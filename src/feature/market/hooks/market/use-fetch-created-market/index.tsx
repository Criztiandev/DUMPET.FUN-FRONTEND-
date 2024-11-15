import { useActiveAddress, useProfileModal } from "arweave-wallet-kit";

const useFetchCreatedMarkets = () => {
  //   const profile = useProfileModal();
  const address = useActiveAddress();

  console.log(address);
  //   profile.setOpen(true);
  //   return useSuspenseQuery({
  //     queryKey: ["/GET /market/created/list"],
  //     queryFn: async () => {
  //       const result = await dryrun({
  //         process: import.meta.env.VITE_DEV_MAIN_PROCESS_ID,
  //         tags: [
  //           { name: "Action", value: "HasWaitFor" },
  //           {
  //             name: "ProfileId",
  //             value: pid,
  //           },
  //         ],
  //       });
  //     },
  //   });
};

export default useFetchCreatedMarkets;
