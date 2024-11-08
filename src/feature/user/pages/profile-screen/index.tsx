import { Badge } from "@/common/components/atoms/ui/badge";
import { Button } from "@/common/components/atoms/ui/button";
import Topbar from "@/common/components/template/layout/topbar";
import { useActiveAddress } from "arweave-wallet-kit";
import { ArrowUp, Coins, Edit } from "lucide-react";

const ProfileScreen = () => {
  const address = useActiveAddress();

  return (
    <div className="w-full ">
      <Topbar />
      <section className="">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
            General overview
          </h2>

          {/* Statistic Section (Future) */}
          <div className="grid grid-cols-2 gap-6 border-b border-t border-gray-200 py-4 dark:border-gray-700 md:py-8 lg:grid-cols-4 xl:gap-16">
            <div>
              <Coins />
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Bet made
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                24
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <ArrowUp size={12} />
                  10.3%
                </span>
              </span>
            </div>

            <div>
              <Coins />
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Bet made
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                24
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <ArrowUp size={12} />
                  10.3%
                </span>
              </span>
            </div>

            <div>
              <Coins />
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Bet made
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                24
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <ArrowUp size={12} />
                  10.3%
                </span>
              </span>
            </div>

            <div>
              <Coins />
              <h3 className="mb-2 text-gray-500 dark:text-gray-400">
                Bet made
              </h3>
              <span className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                24
                <span className="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <ArrowUp size={12} />
                  10.3%
                </span>
              </span>
            </div>
          </div>

          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <img
                    className="h-16 w-16 rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                    alt="Helene avatar"
                  />
                  <div>
                    <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                      Member
                    </span>
                    <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                      Helene Engels
                    </h2>
                  </div>
                </div>
                <dl className="">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Wallet Address
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    {address}
                  </dd>
                </dl>
              </div>
            </div>
            <Button className="space-x-2">
              <Edit size={18} />
              <span>Edit Profile</span>
            </Button>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Bet Held
            </h3>
            <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
              <dl className="w-1/2 sm:w-48">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Bet ID:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <a href="#" className="hover:underline">
                    #FWB12546798
                  </a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Date:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  11.12.2023
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Price:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  $499
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Status:
                </dt>
                <dd>
                  <Badge className="space-x-2 bg-green-900 text-white py-1">
                    <Coins size={18} />
                    <span>Done</span>
                  </Badge>
                </dd>
              </dl>

              <Button>View Result</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
