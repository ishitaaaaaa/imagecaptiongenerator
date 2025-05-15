import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const generateCaption = async () => {
    if (!imageFile) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(',')[1]; // Remove prefix
      try {
        const response = await axios.post('http://localhost:5000/generate-caption', {
          image: base64,
        });
        setCaption(response.data.caption);
      } catch (error) {
        setCaption('❌ Error generating caption');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🖼️ Image Caption Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />
      <button onClick={generateCaption} disabled={!imageFile || loading}>
        {loading ? 'Generating...' : 'Generate Caption'}
      </button>

      {imageFile && (
        <div style={{ marginTop: '2rem' }}>
          <img src={URL.createObjectURL(imageFile)} alt="preview" width="300" />
        </div>
      )}

      {caption && (
        <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
          📌 Caption: {caption}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
