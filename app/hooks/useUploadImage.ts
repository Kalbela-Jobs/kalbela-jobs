import { useState } from "react"

const uploadImage = async (file: any) => {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const url = `https://server.kalbelajobs.com/api/v1/image/upload-image`
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const imageData = await response.json()

    return imageData.data.image_url
  } catch (error) {
    return null
  }
}

export default uploadImage
