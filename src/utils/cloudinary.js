// Placeholder utility to satisfy user.controller.js imports

export const uploadOnCloudinary = async (localFilePath) => {
    console.log(`Mock uploading ${localFilePath} to Cloudinary...`);
    // Simulate successful upload response
    return {
        url: `https://res.cloudinary.com/mock-id/image/upload/v123456789/mock-image.jpg`
    }
}
