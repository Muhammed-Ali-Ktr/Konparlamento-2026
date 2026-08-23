/**
 * Client-Side Image Compression Utility
 * Resizes and compresses user-uploaded images to WebP/JPEG format
 * under 5MB to preserve free Supabase storage limits.
 */
export async function compressImage(file: File, maxSizeBytes = 5 * 1024 * 1024): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If file is already webp/jpeg and smaller than 1.5MB, return directly
    if (file.size <= 1.5 * 1024 * 1024 && (file.type === 'image/webp' || file.type === 'image/jpeg')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1920; // 1080p / 1920 max resolution

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first with quality 0.85
        canvas.toBlob(
          (blob) => {
            if (blob && blob.size <= maxSizeBytes) {
              resolve(blob);
            } else {
              // Fallback to JPEG 0.75 if WebP is too large or unsupported
              canvas.toBlob(
                (jpegBlob) => {
                  if (jpegBlob) {
                    resolve(jpegBlob);
                  } else {
                    reject(new Error('Image compression failed'));
                  }
                },
                'image/jpeg',
                0.75
              );
            }
          },
          'image/webp',
          0.85
        );
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
