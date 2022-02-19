export interface AlertDialogProps {
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
  onAgree: () => void;
  onDisagree: () => void;
  actionText?: {
    agree: string;
    disAgree: string;
  };
}
