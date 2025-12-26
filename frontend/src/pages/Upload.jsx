import { useEffect, useState } from "react";
import { getToken, authFetch } from "../lib/auth";

const API = import.meta.env.VITE_API_URL || 'https://react-shiksak-sarthi-d-bcib.vercel.app/'
// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCatogery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    try {
      setLoading(true);
      // Fetch list directly from Cloudinary via backend endpoint
      const res = await fetch(`${API}/api/media`);
      const data = await res.json();
      // cloudinary.api.resources returns an object with a `resources` array
      const resources = data.items || [];
      // normalize resource shape to match UI (`_id`, `url`, `public_id`, `resource_type`, `format`, `createdAt`)
      const normalized = resources.map((r) => ({
        _id: r.asset_id || r.public_id || `${r.public_id}-${r.filename}`,
        url: r.secure_url || r.url || r.secure_url_https || "",
        public_id: r.public_id,
        resource_type: r.resource_type || r.type || "unknown",
        format: r.format,
        createdAt: r.created_at || r.created_at || null,
        uploadedBy: r.uploadedBy,
        description: r.description,
      }));
      setItems(normalized);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch list");
    } finally {
      setLoading(false);
    }
  }

  function onFileChange(e) {
    setFiles(Array.from(e.target.files || []));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!files.length) return setMessage("Please choose at least one file");

    const fd = new FormData();
    files.forEach((f) => fd.append("file", f));
    // include description text sent from the UI
    if (description) fd.append("description", description);
    fd.append("category", category);

    try {
      setLoading(true);
      setMessage("");
      console.log("UPLOAD URL:", `${API}/api/media/upload`);

      const token = getToken();
      const res = await fetch(`${API}/api/media/upload`, {
        method: "POST",
        // Do not set Content-Type for multipart; the browser sets the boundary.
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });

      const json = await res.json();
      if (!res.ok) {
        setMessage(json.message || "Upload failed");
      } else {
        setMessage(
          `Uploaded ${json.uploaded ? json.uploaded.length : 0} files`
        );
        setFiles([]);
        // refresh list
        fetchList();
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload error");
    } finally {
      setLoading(false);
    }
  }

  const groupedItems = items.reduce((acc, item) => {
  const cat = item.category || "uncategorized";
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(item);
  return acc;
}, {});


  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Upload files</h2>

      <form onSubmit={onSubmit} style={{ marginBottom: 18 }}>
        <div style={{ marginBottom: 8 }}>
          <input type="file" multiple onChange={onFileChange} />
        </div>
        <p>Choose option</p>

        <label>
          <input
            type="radio"
            name="category"
            value="kitchen"
            checked={category === "kitchen"}
            onChange={(e) => setCatogery(e.target.value)}
            required
          />
          Kitchen
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="bedroom"
            checked={category === "bedroom"}
            onChange={(e) => setCatogery(e.target.value)}
          />
          Bedroom
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="livingroom"
            checked={category === "livingroom"}
            onChange={(e) => setCatogery(e.target.value)}
          />
          Living Room
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="wardrobe"
            checked={category === "wardrobe"}
            onChange={(e) => setCatogery(e.target.value)}
          />
          Wardrobe
        </label>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
            Description (optional)
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for these files"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {message && <div style={{ marginBottom: 12 }}>{message}</div>}

      <section>
        <h3>Uploaded items</h3>
        {loading && <div>Loading list...</div>}
        {!loading && items.length === 0 && <div>No uploaded items found.</div>}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 160px)",
            gap: 12,
          }}
        >
          {items.map((it) => (
            <div key={it._id} style={{ border: "1px solid #eee", padding: 8 }}>
              {it.resource_type && it.resource_type.startsWith("image") ? (
                <img
                  src={it.url}
                  alt={it.public_id || it._id}
                  style={{ width: "100%", height: 100, objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {it.format || it.resource_type}
                </div>
              )}
              {/* {it.description && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    padding: "6px 8px",
                    fontSize: 12,
                    maxHeight: 48,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {it.description}
                </div>
              )} */}
              <div style={{ fontSize: 12, marginTop: 6 }}>
                {/* {new Date(it.createdAt).toLocaleString()} */}
                {new Date(it.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
              <div style={{ marginTop: 6 }}>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this item?")) return;
                    try {
                      setLoading(true);
                      const token = getToken();
                      console.log(token, "token");

                      // use authFetch to include Authorization header if token present
                      const dres = await authFetch(
                        `${API}/api/media/${encodeURIComponent(it.public_id)}`,
                        {
                          method: "DELETE",
                          headers: token
                            ? { Authorization: `Bearer ${token}` }
                            : undefined,
                        }
                      );
                      const djson = await dres.json();
                      if (!dres.ok) {
                        setMessage(djson.message || "Delete failed");
                      } else {
                        setMessage("Deleted");
                        // refresh
                        fetchList();
                      }
                    } catch (err) {
                      console.error(err);
                      setMessage("Delete error");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  style={{ marginTop: 6, padding: "6px 8px", borderRadius: 6 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
