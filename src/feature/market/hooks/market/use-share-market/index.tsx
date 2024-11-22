import { useCallback } from "react";

const useShareMarket = (processId: string) => {
  const handleShare = useCallback(() => {
    const text = `Check out this market on dumpet.fun - `;
    const url = `${window.location.origin}/market/${processId}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;

    const newWindow = window.open(twitterUrl, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }, [processId]);

  return handleShare;
};

export default useShareMarket;
