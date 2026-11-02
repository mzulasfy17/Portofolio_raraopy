/**
 * Image Compression & Optimization Utility (Client-Side)
 * 
 * Compresses large camera/smartphone photos (5MB - 15MB) down to ~100KB - 250KB
 * directly in the user's browser before upload.
 * 
 * Benefits:
 * 1. Uploads finish in milliseconds instead of 20-40 seconds or timing out.
 * 2. Visitors load the website and proof modals instantly without heavy data consumption.
 * 3. Keeps Base64 fallbacks well under Firestore's 1MB document size limit.
 * 4. Preserves high visual sharpness for full-screen zoom inspection.
 */

/**
 * Format bytes into human-readable string (e.g., 145 KB, 2.4 MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Compress an image file using HTML5 Canvas API
 * 
 * @param {File|Blob} file - The original file
 * @param {Object} options - Compression options
 * @param {number} [options.maxWidth=1600] - Max output width
 * @param {number} [options.maxHeight=1600] - Max output height
 * @param {number} [options.quality=0.82] - Compression quality (0 to 1)
 * @param {string} [options.format='image/webp'] - Target format ('image/webp' or 'image/jpeg')
 * @returns {Promise<{ file: File, compressed: boolean, originalSize: number, finalSize: number, savingsPercent: number, info: string }>}
 */
export async function compressImage(file, options = {}) {
  // If not a valid image file, return original unchanged
  if (!file || !file.type || !file.type.startsWith('image/')) {
    return {
      file,
      compressed: false,
      originalSize: file?.size || 0,
      finalSize: file?.size || 0,
      savingsPercent: 0,
      info: 'Format non-gambar (tidak dikompres)'
    };
  }

  // Preserve animated GIFs and SVG vectors as-is
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return {
      file,
      compressed: false,
      originalSize: file.size,
      finalSize: file.size,
      savingsPercent: 0,
      info: 'Format SVG/GIF dipertahankan asli'
    };
  }

  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
    format = 'image/webp'
  } = options;

  const originalSize = file.size;

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down proportionally if image exceeds max bounds
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({
              file,
              compressed: false,
              originalSize,
              finalSize: originalSize,
              savingsPercent: 0,
              info: 'Canvas context tidak tersedia'
            });
            return;
          }

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Helper to finalize blob
          const finalizeBlob = (blob, exportType) => {
            if (!blob) {
              resolve({
                file,
                compressed: false,
                originalSize,
                finalSize: originalSize,
                savingsPercent: 0,
                info: 'Gagal membuat blob'
              });
              return;
            }

            // If compressed blob is not smaller than original, keep original
            if (blob.size >= originalSize) {
              resolve({
                file,
                compressed: false,
                originalSize,
                finalSize: originalSize,
                savingsPercent: 0,
                info: `Ukuran asli sudah optimal (${formatFileSize(originalSize)})`
              });
              return;
            }

            const cleanBase = (file.name || 'image').replace(/\.[^/.]+$/, '');
            const ext = exportType === 'image/webp' ? '.webp' : '.jpg';
            const optimizedFileName = `${cleanBase}_opt${ext}`;

            const compressedFile = new File([blob], optimizedFileName, {
              type: exportType,
              lastModified: Date.now()
            });

            const savingsPercent = Math.round(((originalSize - blob.size) / originalSize) * 100);
            const info = `${formatFileSize(originalSize)} ➔ ${formatFileSize(blob.size)} (-${savingsPercent}%)`;

            resolve({
              file: compressedFile,
              compressed: true,
              originalSize,
              finalSize: blob.size,
              savingsPercent,
              info,
              width,
              height
            });
          };

          // Try exporting with requested format (e.g. WebP)
          canvas.toBlob((blob) => {
            if (blob) {
              finalizeBlob(blob, format);
            } else {
              // Fallback to JPEG if browser doesn't support WebP export
              canvas.toBlob((jpegBlob) => {
                finalizeBlob(jpegBlob, 'image/jpeg');
              }, 'image/jpeg', quality);
            }
          }, format, quality);

        } catch (err) {
          console.warn('Canvas compression error:', err);
          resolve({
            file,
            compressed: false,
            originalSize,
            finalSize: originalSize,
            savingsPercent: 0,
            info: 'Error kompresi: ' + err.message
          });
        }
      };

      img.onerror = (err) => {
        console.warn('Image load error:', err);
        resolve({
          file,
          compressed: false,
          originalSize,
          finalSize: originalSize,
          savingsPercent: 0,
          info: 'Gagal membaca gambar'
        });
      };

      img.src = event.target.result;
    };

    reader.onerror = (err) => {
      console.warn('FileReader error:', err);
      resolve({
        file,
        compressed: false,
        originalSize,
        finalSize: originalSize,
        savingsPercent: 0,
        info: 'Gagal membaca file'
      });
    };

    reader.readAsDataURL(file);
  });
}
