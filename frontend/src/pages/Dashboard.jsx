import { useEffect, useState } from "react";
import API from "../api/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function PhotoPopup({ photo }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const res = await API.get(`/comments/${photo.id}`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async () => {
    if (!newComment.trim()) return;

    await API.post(`/comments/${photo.id}`, {
      comment: newComment,
    });

    setNewComment("");
    fetchComments();
  };

  return (
    <div className="popup-card">
      <img
        src={`http://localhost:5000${photo.image_url}`}
        alt="Uploaded"
        className="popup-image"
      />

      <h3>Uploaded Photo</h3>

      <p className="popup-user">
        Uploaded by {photo.name}
      </p>

      <div>
        <p>{photo.description}</p>

        {photo.description.includes("AI description") && (
          <span
            style={{
              fontSize: "12px",
              color: "#2563eb",
              fontWeight: "600",
            }}
          >
            Auto-generated description
          </span>
        )}
      </div>

      <div className="comments-section">
        <h4>Comments</h4>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="empty-comment">
              No comments yet.
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-box"
              >
                <strong>{comment.name}</strong>
                <p>{comment.comment}</p>
              </div>
            ))
          )}
        </div>

        <input
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) =>
            setNewComment(e.target.value)
          }
          className="comment-input"
        />

        <button
          onClick={addComment}
          className="small-btn"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [photos, setPhotos] = useState([]);

  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
    description: "",
    image: null,
  });

  const fetchPhotos = async () => {
    const res = await API.get("/photos");
    setPhotos(res.data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("latitude", form.latitude);
    formData.append("longitude", form.longitude);
    formData.append("description", form.description);
    formData.append("image", form.image);

    await API.post("/photos/upload", formData);

    setForm({
      latitude: "",
      longitude: "",
      description: "",
      image: null,
    });

    fetchPhotos();
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>GeoPhotoMap</h1>

          <p>
            Upload geotagged photos and explore
            them on an interactive map.
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-layout">
        <section className="upload-card">
          <h2>Upload Photo</h2>

          <p>
            Add an image with latitude and
            longitude.
          </p>

          <form
            onSubmit={handleUpload}
            className="upload-form"
          >
            <input
              placeholder="Latitude, example: 48.8566"
              value={form.latitude}
              onChange={(e) =>
                setForm({
                  ...form,
                  latitude: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Longitude, example: 2.3522"
              value={form.longitude}
              onChange={(e) =>
                setForm({
                  ...form,
                  longitude: e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files[0],
                })
              }
              required
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Upload Photo
            </button>
          </form>

          <div className="stats-box">
            <span>{photos.length}</span>

            <p>Total photos uploaded</p>
          </div>
        </section>

        <section className="map-card">
          <MapContainer
            center={[48.8566, 2.3522]}
            zoom={4}
            className="map-container"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {photos.map((photo) => (
              <Marker
                key={photo.id}
                position={[
                  photo.latitude,
                  photo.longitude,
                ]}
              >
                <Popup>
                  <PhotoPopup photo={photo} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;