//CSS
import "./UploadImage.css";

function UploadImage({ setValue, imageUrl, size = 120 }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the FileList
    if (file) {
      console.log("Uploaded file:", file); // Log the uploaded file
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File content (base64):", reader.result); // Log the base64 content
        setValue("image", reader.result); // Update the "image" field in react-hook-form
      };
      reader.readAsDataURL(file); // Read the file as a base64 string
    }
  };

  return (
    <>
      <div
        className="image-preview"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "",
          width: `${size}px`,
          height: `${size}px`,
        }}
        onClick={() => document.getElementById("file-upload").click()}
      >
        {!imageUrl && (
          <p style={{ fontSize: "var(--font-caption)" }}>Upload image</p>
        )}
      </div>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange} // Handle file selection
        style={{ display: "none" }}
      />
    </>
  );
}

export default UploadImage;
