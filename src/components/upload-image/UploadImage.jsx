//CSS
import "./UploadImage.css";

function UploadImage({ clearErrors, setValue, imageUrl, error, size = 120 }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File content (base64):", reader.result);
        setValue("image", reader.result);
        clearErrors("image");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-container">
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
          <p
            style={{
              fontSize: "var(--font-caption)",
              fontStyle: "var(--logo-font)",
            }}
          >
            Upload avatar
          </p>
        )}
      </div>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {error ? (
        <p className="form-error">{error.message}</p>
      ) : (
        <p
          className="label"
          style={{ opacity: "0" }}
        >
          e
        </p>
      )}
    </div>
  );
}

export default UploadImage;
