import   { useState, useEffect, type ChangeEvent } from 'react';
import {
  Table, TableBody, TableCell,   TableRow,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Typography
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Plus as AddIcon,
  Edit as EditIcon
} from 'lucide-react';

interface SliderImage {
  id: number;
  src: string;
  alt: string;
}

interface Metrics {
  experienceYears: number;
  totalEmployees: number;
  sewingCapacity: number;
  yearlyTurnover: number;
}

interface AboutHero {
  title: string;
  tagline: string;
  introduction: string;
  sliderImages: SliderImage[];
  metrics: Metrics;
}

const MAX_TEXT_LENGTH = 100;

export default function AboutHeroComponent() {
  const [hero, setHero] = useState<AboutHero | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<AboutHero>>({ sliderImages: [] });
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getImageUrl = (relativePath: string) => {
  const baseUrl = API_BASE_URL.replace('/api', '');
  const mainPath = `${baseUrl}/${relativePath}`;
  const fallbackPath = `${baseUrl}/public/${relativePath}`;
  return { mainPath, fallbackPath };
};

  // Modals for long text and image preview
  const [showTextModal, setShowTextModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');

  useEffect(() => { fetchHero(); }, []);
// console.log(hero)
  const fetchHero = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/about-hero`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setHero({
        title: data.AboutHero.title,
        tagline: data.AboutHero.tagline,
        introduction: data.AboutHero.introduction,
        sliderImages: data.AboutHero.sliderImages,
        metrics: data.metrics
      });
      
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleOpen = () => {
    if (!hero) return;
    setForm({
      title: hero.title,
      tagline: hero.tagline,
      introduction: hero.introduction,
      sliderImages: [...hero.sliderImages],
      metrics: { ...hero.metrics }
    });
    setDeletedIds([]);
    setNewFiles([]);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMetricChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      metrics: { ...(prev.metrics as Metrics), [e.target.name]: Number(e.target.value) }
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files).forEach(file => {
      setNewFiles(prev => [...prev, file]);
      setForm(prev => ({
        ...prev,
        sliderImages: [...(prev.sliderImages || []), { id: 0, src: '', alt: file.name }]
      }));
    });
  };

  const removeExistingImage = (id: number) => {
    setDeletedIds(prev => [...prev, id]);
    setForm(prev => ({
      ...prev,
      sliderImages: (prev.sliderImages || []).filter(img => img.id !== id)
    }));
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setForm(prev => ({
      ...prev,
      sliderImages: (prev.sliderImages || []).filter((_, i) => i !== prev.sliderImages!.length - newFiles.length + index)
    }));
  };

  const handleAltChange = (idOrIndex: number, value: string) => {
    setForm(prev => ({
      ...prev,
      sliderImages: (prev.sliderImages || []).map((img, idx) =>
        img.id === idOrIndex || idx === idOrIndex ? { ...img, alt: value } : img
      )
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.tagline || !form.introduction || !form.metrics) return;
    const method = hero ? 'PUT' : 'POST';
    const url = `${API_BASE_URL}/api/about-hero`;
    const formData = new FormData();

    formData.append('_method', method);
    formData.append('AboutHero[title]', form.title);
    formData.append('AboutHero[tagline]', form.tagline);
    formData.append('AboutHero[introduction]', form.introduction);

    // metrics
    Object.entries(form.metrics).forEach(([key, val]) => {
      formData.append(`metrics[${key}]`, String(val));
    });

    // deleted images
    deletedIds.forEach(id => formData.append('AboutHero[deletedImages][]', String(id)));

    // existing images alt
    (form.sliderImages || []).forEach((img, idx) => {
      if (img.id > 0) {
        formData.append(`AboutHero[sliderImages][${idx}][id]`, String(img.id));
      }
      formData.append(`AboutHero[sliderImages][${idx}][alt]`, img.alt);
    });

    // new files
    newFiles.forEach((file, idx) => {
      formData.append(`AboutHero[sliderImages][${hero!.sliderImages.length + idx}][image]`, file);
    });

    try {
      const res = await fetch(url, { method: 'POST', body: formData });
      if (!res.ok) throw await res.json();
      fetchHero();
      setOpen(false);
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  // Helpers for UI
  const renderTruncated = (text: string) => {
    if (text.length <= MAX_TEXT_LENGTH) return text;
    return (
      <>
        {text.slice(0, MAX_TEXT_LENGTH) + '...'}{' '}
        <Button size="small" onClick={() => setShowTextModal(true)}>Read more</Button>
      </>
    );
  };

  const handleImageClick = (src: string) => {
    setModalImageSrc(src);
    setShowImageModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">About Hero</h2>
        <Button variant="contained" onClick={handleOpen} startIcon={<EditIcon />}>Edit</Button>
      </div>

      {hero && (
        <>
          <Table>
            <TableBody>
              <TableRow><TableCell>Title</TableCell><TableCell>{hero.title}</TableCell></TableRow>
              <TableRow><TableCell>Tagline</TableCell><TableCell>{hero.tagline}</TableCell></TableRow>
              <TableRow><TableCell>Introduction</TableCell><TableCell>{renderTruncated(hero.introduction)}</TableCell></TableRow>
              <TableRow><TableCell>Experience Years</TableCell><TableCell>{hero.metrics.experienceYears}</TableCell></TableRow>
              <TableRow><TableCell>Total Employees</TableCell><TableCell>{hero.metrics.totalEmployees}</TableCell></TableRow>
              <TableRow><TableCell>Sewing Capacity</TableCell><TableCell>{hero.metrics.sewingCapacity}</TableCell></TableRow>
              <TableRow><TableCell>Yearly Turnover</TableCell><TableCell>{hero.metrics.yearlyTurnover}</TableCell></TableRow>
              <TableRow>
                <TableCell>Slider Images</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {hero.sliderImages.map(img => {
  const { mainPath, fallbackPath } = getImageUrl(img.src);
  return (
    <img
      key={img.id}
      src={mainPath}
      alt={img.alt}
      className="h-16 w-24 object-cover rounded cursor-pointer"
      onError={e => {
        const target = e.target as HTMLImageElement;
        target.src = fallbackPath;
      }}
      onClick={() => handleImageClick(img.src)}
    />
  );
})}

                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Text modal */}
          <Dialog open={showTextModal} onClose={() => setShowTextModal(false)} fullWidth>
            <DialogTitle>Full Introduction</DialogTitle>
            <DialogContent><Typography>{hero.introduction}</Typography></DialogContent>
            <DialogActions><Button onClick={() => setShowTextModal(false)}>Close</Button></DialogActions>
          </Dialog>

          {/* Image modal */}
          <Dialog open={showImageModal} onClose={() => setShowImageModal(false)} fullWidth>
            <DialogContent>
              {(() => {
  const { mainPath, fallbackPath } = getImageUrl(modalImageSrc);
  return (
    <img
      src={mainPath}
      alt="Preview"
      className="w-full h-auto"
      onError={e => {
        const target = e.target as HTMLImageElement;
        target.src = fallbackPath;
      }}
    />
  );
})()}

            </DialogContent>
            <DialogActions><Button onClick={() => setShowImageModal(false)}>Close</Button></DialogActions>
          </Dialog>
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit About Hero</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField fullWidth margin="dense" label="Title" name="title"
              value={form.title || ''} onChange={handleChange} />
            <TextField fullWidth margin="dense" label="Tagline" name="tagline"
              value={form.tagline || ''} onChange={handleChange} />
            <TextField fullWidth margin="dense" label="Introduction" name="introduction"
              value={form.introduction || ''} onChange={handleChange} multiline rows={4} />
          </div>

          <div className="mt-4">
            <Typography variant="h6">Slider Images</Typography>
            {(form.sliderImages || []).map((img, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
          {img.src && (() => {
  const { mainPath, fallbackPath } = getImageUrl(img.src);
  return (
    <img
      src={mainPath}
      alt={img.alt}
      className="h-12 rounded"
      onError={e => {
        const target = e.target as HTMLImageElement;
        target.src = fallbackPath;
      }}
    />
  );
})()}

                <TextField label="Alt Text" value={img.alt}
                  onChange={e => handleAltChange(img.id || idx, e.target.value)} />
                {img.id > 0 ? (
                  <IconButton onClick={() => removeExistingImage(img.id)}><DeleteIcon /></IconButton>
                ) : (
                  <IconButton onClick={() => removeNewFile(idx)}><DeleteIcon /></IconButton>
                )}
              </div>
            ))}
            <Button variant="outlined" component="label" startIcon={<AddIcon />}>Add Image<input type="file" hidden multiple accept="image/*" onChange={handleFileChange} /></Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <TextField label="Experience Years" name="experienceYears"
              value={form.metrics?.experienceYears || ''} onChange={handleMetricChange} />
            <TextField label="Total Employees" name="totalEmployees"
              value={form.metrics?.totalEmployees || ''} onChange={handleMetricChange} />
            <TextField label="Sewing Capacity" name="sewingCapacity"
              value={form.metrics?.sewingCapacity || ''} onChange={handleMetricChange} />
            <TextField label="Yearly Turnover" name="yearlyTurnover"
              value={form.metrics?.yearlyTurnover || ''} onChange={handleMetricChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}