export const fetchAsBlob = url => fetch(url)
    .then(response => response.blob());

export const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

const addFakeToJson = (base64) => Promise.resolve({json: () =>base64 })

export const fetchAsBase64 = url => fetchAsBlob(url)
    .then(convertBlobToBase64)
    .then(addFakeToJson)