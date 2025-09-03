import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from "@mui/material";


interface ForgotPasswordProps {
    open: boolean;
    handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        handleClose();
                    },
                    sx: {
                        backgroundImage: 'none',
                    }
                }
            }}
        >
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email address and we will send you a link to reset your password.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    fullWidth
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    margin="dense"
                    required
                    id="email"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    )
}