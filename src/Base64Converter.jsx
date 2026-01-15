import { useState } from 'react';
import './Base64Converter.css';

const Base64Converter = () => {
  const [base64String, setBase64String] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setFileName(file.name);
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64 = reader.result;
        setBase64String(base64);
        setImagePreview(base64);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(base64String);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleReset = () => {
    setBase64String('');
    setImagePreview('');
    setFileName('');
    setCopied(false);
    // Reset file input
    const fileInput = document.getElementById('imageInput');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="converter-container">
      <div className="header">
        <h1>Base64 Image Converter</h1>
        <p>Convert your images to Base64 encoded strings</p>
      </div>

      <div className="upload-section">
        <label htmlFor="imageInput" className="upload-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <span className="upload-text">
            {fileName ? fileName : 'Click to upload an image'}
          </span>
          <span className="upload-subtext">
            PNG, JPG, GIF, SVG, WEBP up to 10MB
          </span>
        </label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
      </div>

      {imagePreview && (
        <div className="preview-section">
          <h2>Image Preview</h2>
          <div className="preview-container">
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </div>
        </div>
      )}

      {base64String && (
        <div className="output-section">
          <div className="output-header">
            <h2>Base64 Output</h2>
            <div className="button-group">
              <button
                onClick={handleCopyToClipboard}
                className={`copy-button ${copied ? 'copied' : ''}`}
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
              <button onClick={handleReset} className="reset-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
                Reset
              </button>
            </div>
          </div>
          <div className="output-container">
            <textarea
              readOnly
              value={base64String}
              className="output-textarea"
              rows="10"
            />
          </div>
          <div className="output-info">
            <p>Length: {base64String.length} characters</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Base64Converter;
