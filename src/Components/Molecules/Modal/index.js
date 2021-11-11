import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function FormDialog({open, title,children, action}) {
  return (
    <div>
      <Dialog open={open}>
      <DialogTitle>{action} {title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}