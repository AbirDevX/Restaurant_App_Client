export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileRender = new FileReader();
    fileRender?.readAsDataURL(file);
    fileRender.onload = () => {
      resolve(fileRender.result);
    };
    fileRender.onerror = (err) => {
      reject(err);
    };
  });
}

