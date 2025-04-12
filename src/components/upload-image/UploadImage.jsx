//CSS
import "./UploadImage.css";

function UploadImage({ clearErrors, setValue, imageUrl, error, size = 120 }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
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
        accept="image/png, image/jpeg"
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
