import axios from 'axios';

export const uploadFileToIPFS = async (file: File): Promise<string | null> => {
  if (!process.env.NEXT_PUBLIC_PINATA_JWT) {
    console.error('Pinata JWT not found in environment variables');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    });
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    return null;
  }
};

export const uploadJsonToIPFS = async (json: object): Promise<string | null> => {
    if (!process.env.NEXT_PUBLIC_PINATA_JWT) {
        console.error('Pinata JWT not found in environment variables');
        return null;
    }

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', json, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.error('Error uploading JSON to Pinata:', error);
        return null;
    }
};
