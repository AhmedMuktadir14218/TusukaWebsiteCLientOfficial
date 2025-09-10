import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Contact } from "./types";

interface Props {
  contact: Contact | null;
  onClose: () => void;
}

const ContactDetailsModal: React.FC<Props> = ({ contact, onClose }) => {
  if (!contact) return null;

  return (
    <Dialog
      open={!!contact}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className:
          "rounded-lg shadow-xl bg-[var(--color-webBg)] text-[var(--color-webText)]",
      }}
    >
      {/* HEADER */}
      <DialogTitle className="flex justify-between items-center border-b border-[var(--color-accentSoft)]">
        <Typography
          variant="h6"
          className="font-bold text-[var(--color-titleText)]"
        >
          Contact Details
        </Typography>
        <IconButton onClick={onClose} size="small" className="text-[var(--color-titleText)] hover:text-[var(--color-accent)]">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent className="space-y-3">
        <div>
          <Typography variant="subtitle2" className="font-semibold text-[var(--color-accent)]">
            Name
          </Typography>
          <Typography>{contact.full_name}</Typography>
        </div>

        <Divider className="border-[var(--color-accentSoft)]" />

        <div>
          <Typography variant="subtitle2" className="font-semibold text-[var(--color-accent)]">
            Email
          </Typography>
          <Typography>{contact.email}</Typography>
        </div>

        <Divider className="border-[var(--color-accentSoft)]" />

        <div>
          <Typography variant="subtitle2" className="font-semibold text-[var(--color-accent)]">
            Subject
          </Typography>
          <Typography>{contact.subject}</Typography>
        </div>

        <Divider className="border-[var(--color-accentSoft)]" />

        <div>
          <Typography variant="subtitle2" className="font-semibold text-[var(--color-accent)]">
            Phone
          </Typography>
          <Typography>{contact.phone}</Typography>
        </div>

        <Divider className="border-[var(--color-accentSoft)]" />

        <div>
          <Typography variant="subtitle2" className="font-semibold text-[var(--color-accent)]">
            Message
          </Typography>
          <Typography
            className="whitespace-pre-wrap bg-[var(--color-cardBG)] text-[var(--color-navFootText)] rounded p-3"
          >
            {contact.message}
          </Typography>
        </div>

        <Divider className="border-[var(--color-accentSoft)]" />

        <Typography
          variant="caption"
          className="text-gray-600 italic text-sm"
        >
           {new Date(contact.created_at).toLocaleString()}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsModal;