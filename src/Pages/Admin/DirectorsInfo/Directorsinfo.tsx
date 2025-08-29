import React, { useEffect, useState, type ChangeEvent } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Add, Edit, Delete, RemoveCircle } from '@mui/icons-material';
 

type Director = {
  id: number;
  name: string;
  title: string;
  image?: string;
  born?: string;
  nationality?: string;
  religion?: string;
  occupation?: string;
  known_for?: string;
  marital_status?: string;
  spouse?: string;
  children?: string[];
  address: { email?: string; house?: string };
  social_media: { linkedin?: string; twitter?: string; facebook?: string };
  description?: { section: string; content: string }[];
};

// Hard-coded backend URL
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const DirectorsInfo: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Director | null>(null);

  const [form, setForm] = useState({
    name: '',
    title: '',
    born: '',
    nationality: '',
    religion: '',
    occupation: '',
    known_for: '',
    marital_status: '',
    spouse: '',
    childrenInput: '',
    addressEmail: '',
    addressHouse: '',
    socialLinkedin: '',
    socialTwitter: '',
    socialFacebook: '',
    image: null as File | null,
  });

  const [descriptionEntries, setDescriptionEntries] = useState<
    { section: string; content: string }[]
  >([]);

  // Fetch directors
  const fetchDirectors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/directors`);
      setDirectors(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
// console.log(fetchDirectors)
  // useEffect(fetchDirectors, []);
  useEffect(() => {
  fetchDirectors();
}, []);

  // Open modal (add or edit)
  const handleOpen = (dir?: Director) => {
    if (dir) {
      setEditing(dir);
      setForm({
        name: dir.name,
        title: dir.title,
        born: dir.born || '',
        nationality: dir.nationality || '',
        religion: dir.religion || '',
        occupation: dir.occupation || '',
        known_for: dir.known_for || '',
        marital_status: dir.marital_status || '',
        spouse: dir.spouse || '',
        childrenInput: (dir.children || []).join(', '),
        addressEmail: dir.address.email || '',
        addressHouse: dir.address.house || '',
        socialLinkedin: dir.social_media.linkedin || '',
        socialTwitter: dir.social_media.twitter || '',
        socialFacebook: dir.social_media.facebook || '',
        image: null,
      });
      setDescriptionEntries(dir.description || []);
    } else {
      setEditing(null);
      setForm({
        name: '',
        title: '',
        born: '',
        nationality: '',
        religion: '',
        occupation: '',
        known_for: '',
        marital_status: '',
        spouse: '',
        childrenInput: '',
        addressEmail: '',
        addressHouse: '',
        socialLinkedin: '',
        socialTwitter: '',
        socialFacebook: '',
        image: null,
      });
      setDescriptionEntries([{ section: '', content: '' }]);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Handle simple inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setForm(f => ({ ...f, image: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // Handle description fields
  const handleDescChange = (idx: number, field: 'section' | 'content', value: string) => {
    setDescriptionEntries(descs =>
      descs.map((d, i) => (i === idx ? { ...d, [field]: value } : d))
    );
  };
  const removeDesc = (idx: number) => {
    setDescriptionEntries(descs => descs.filter((_, i) => i !== idx));
  };

  // Submit create/update
const handleSubmit = async () => {
  const data = new FormData();

  [
    'name','title','born','nationality','religion',
    'occupation','known_for','marital_status','spouse'
  ].forEach(key => {
    const v = (form as any)[key];
    if (v) data.append(key, v);
  });

  form.childrenInput
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .forEach((c, i) => data.append(`children[${i}]`, c));

  data.append('address[email]', form.addressEmail);
  data.append('address[house]', form.addressHouse);
  data.append('social_media[linkedin]', form.socialLinkedin);
  data.append('social_media[twitter]', form.socialTwitter);
  data.append('social_media[facebook]', form.socialFacebook);

  descriptionEntries.forEach((d, i) => {
    data.append(`description[${i}][section]`, d.section);
    data.append(`description[${i}][content]`, d.content);
  });

  if (form.image) data.append('image', form.image);

  try {
    if (editing) {
      await axios.post(
        `${BACKEND_URL}/api/directors/${editing.id}`,
        data,
        { headers: { 'X-HTTP-Method-Override': 'PUT' } }
      );
    } else {
      // ✅ FIXED (backticks instead of quotes)
      await axios.post(`${BACKEND_URL}/api/directors`, data);
    }
    fetchDirectors();
    handleClose();
  } catch (err) {
    console.error(err);
  }
};


  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this director?')) return;
    await axios.delete(`${BACKEND_URL}/api/directors/${id}`);
    fetchDirectors();
  };

  // Build full URL, injecting 'directors/' segment if missing
// Build full URL, injecting 'directors/' segment if missing
const fullImageUrl = (path?: string) => {
  if (!path) return '';
  // Check if 'directors/' is already in the path after 'uploads/'
  if (path.includes('public/uploads/')) {
    return `${BACKEND_URL}/${path}`;
  }
  // If 'uploads/' is present but 'directors/' is not, insert it
  if (path.includes('uploads/')) {
    return `${BACKEND_URL}/${path.replace('uploads/', 'public/uploads/directors/')}`;
  }
  // Fallback for paths that don't even contain 'uploads/'
  // This case might need adjustment based on expected backend path structures
  return `${BACKEND_URL}/${path}`;
};

  return ( 
    <div>
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Board of Directors</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Director
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Born</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading…</TableCell>
              </TableRow>
            ) : directors.length ? (
              directors.map(dir => {
                const imgUrl = fullImageUrl(dir.image);
                // console.log('Image URL:', imgUrl);

                return (
                  <TableRow key={dir.id}>
                    <TableCell>
                      {dir.image ? (
                        <img
                          src={imgUrl}
                          alt={dir.name}
                          width={50}
                          height={50}
                          style={{ objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : '—'}
                    </TableCell>
                    <TableCell>{dir.name}</TableCell>
                    <TableCell>{dir.title}</TableCell>
                    <TableCell>{dir.born || '—'}</TableCell>
                    <TableCell>{dir.nationality || '—'}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleOpen(dir)}><Edit/></IconButton>
                      <IconButton onClick={() => handleDelete(dir.id)}><Delete/></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No directors found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{ editing ? 'Edit Director' : 'Add Director' }</DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate>
            {/* Basic fields */}
            {[
              { label: 'Name', name: 'name' },
              { label: 'Title', name: 'title' },
              { label: 'Born', name: 'born' },
              { label: 'Nationality', name: 'nationality' },
              { label: 'Religion', name: 'religion' },
              { label: 'Occupation', name: 'occupation' },
              { label: 'Known For', name: 'known_for' },
              { label: 'Marital Status', name: 'marital_status' },
              { label: 'Spouse', name: 'spouse' },
            ].map(f => (
              <TextField
                key={f.name}
                margin="normal"
                fullWidth
                label={f.label}
                name={f.name}
                value={(form as any)[f.name]}
                onChange={handleChange}
              />
            ))}

            {/* Children */}
            <TextField
              margin="normal"
              fullWidth
              label="Children (comma-separated)"
              name="childrenInput"
              value={form.childrenInput}
              onChange={handleChange}
            />

            {/* Address */}
            <Typography variant="subtitle1" mt={2}>Address</Typography>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="addressEmail"
              value={form.addressEmail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="House"
              name="addressHouse"
              value={form.addressHouse}
              onChange={handleChange}
            />

            {/* Social Media */}
            <Typography variant="subtitle1" mt={2}>Social Media</Typography>
            <TextField
              margin="normal"
              fullWidth
              label="LinkedIn URL"
              name="socialLinkedin"
              value={form.socialLinkedin}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Twitter URL"
              name="socialTwitter"
              value={form.socialTwitter}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Facebook URL"
              name="socialFacebook"
              value={form.socialFacebook}
              onChange={handleChange}
            />

            {/* Description sections */}
            <Typography variant="subtitle1" mt={2}>Description</Typography>
            {descriptionEntries.map((d, i) => (
              <Box key={i} mb={3}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <TextField
                    label="Section"
                    value={d.section}
                    onChange={e => handleDescChange(i, 'section', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton onClick={() => removeDesc(i)} disabled={descriptionEntries.length===1}>
                    <RemoveCircle/>
                  </IconButton>
                </Box>
                <TextField
                  label="Content"
                  value={d.content}
                  onChange={e => handleDescChange(i, 'content', e.target.value)}
                  multiline rows={4} fullWidth
                />
              </Box>
            ))}
            <Button
              startIcon={<Add/>}
              onClick={() => setDescriptionEntries(descs => [...descs, { section: '', content: '' }])}
              sx={{ mt: 1 }}
            >
              Add Section
            </Button>

            {/* Image upload */}
            <Button variant="outlined" component="label" sx={{ mt: 3 }}>
              Upload Photo
              <input type="file" hidden name="image" accept="image/*" onChange={handleChange} />
            </Button>
            {form.image && <Typography variant="body2" mt={1}>Selected: {form.image.name}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{ editing ? 'Save Changes' : 'Create' }</Button>
        </DialogActions>
      </Dialog>
    </Box> 
    </div>
  );
};

export default DirectorsInfo;
