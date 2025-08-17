// Updated ImageManagerModal.tsx
import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

interface PlantImage {
    id: number;
    image_path: string;
}

interface ImageManagerModalProps {
    open: boolean;
    onClose: () => void;
    plantId: number;
    plantName: string;
    existingImages?: PlantImage[]; // Make optional
    onAddImages: (plantId: number, imageFiles: File[]) => Promise<PlantImage[]>;
    onRemoveImage: (plantId: number, imageId: number) => Promise<boolean>;
}

export const ImageManagerModal = ({
    open,
    onClose,
    plantId,
    plantName,
    existingImages = [], // Default to empty array
    onAddImages,
    onRemoveImage
}: ImageManagerModalProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        
        setIsUploading(true);
        try {
            await onAddImages(plantId, selectedFiles);
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error uploading images:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = async (imageId: number) => {
        try {
            await onRemoveImage(plantId, imageId);
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Manage Images for {plantName}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid component="div" item xs={12}>
                        <div className="mb-4">
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<AddIcon />}
                            >
                                Add Images
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {selectedFiles.length > 0 && (
                                <div className="mt-2">
                                    <p>{selectedFiles.length} image(s) selected</p>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        className="mt-2"
                                    >
                                        {isUploading ? 'Uploading...' : 'Upload'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Grid>
                    <Grid component="div" item xs={12}>
                        <ImageList cols={3} gap={8}>
                            {existingImages.map((image) => (
                                <ImageListItem key={image.id}>
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={`Plant ${plantName}`}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        position="top"
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'white' }}
                                                onClick={() => handleRemove(image.id)}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};