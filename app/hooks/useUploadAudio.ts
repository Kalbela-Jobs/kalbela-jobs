"use client";


const upload_audio = async (file: any) => {


      try {
            const formData = new FormData();
            formData.append("audio", file);

            const url = `${process.env.NEXT_APP_BASE_URL}/api/v2/image/upload-audio`;
            const response = await fetch(url, {
                  method: "PUT",
                  body: formData,
            });

            if (!response.ok) {
                  throw new Error('Failed to upload audio');

            }

            const imageData = await response.json();

            return imageData.data.audio_url;
      } catch (error) {
            return null;
      }
};


export default upload_audio;
