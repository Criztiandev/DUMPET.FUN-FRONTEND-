import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/atoms/ui/alert-dialog";
import { Button } from "@/common/components/atoms/ui/button";
import useCancelBet from "@/feature/bet/hooks/use-cancel-bet";
import { useParams } from "react-router-dom";

interface Props {
  disabled?: boolean;
}

const CancelVoteDialog = ({ disabled }: Props) => {
  const { id: marketID } = useParams();
  const { mutate } = useCancelBet(marketID || "");

  const handleCancelVote = () => {
    mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={disabled}>
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your vote
            from the pool
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelVote}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelVoteDialog;
