import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getToken, authFetch } from "../lib/auth";

const API = import.meta.env.VITE_API_URL; // || 'https://react-shiksak-sarthi-d.vercel.app'
// const API = import.meta.env.VITE_API_URL || "https://react-shiksak-sarthi-d.vercel.app";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCatogery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
        category: r.category || "uncategorized",
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

    //   const token = getToken();
    // if (!token) {
    //   setMessage("You are not logged in. Please login again.");
    //   return;
    // }

    const fd = new FormData();
    files.forEach((f) => fd.append("file", f));
    // include description text sent from the UI
    if (description) fd.append("description", description);
    fd.append("category", category);

    try {
      setLoading(true);
      setMessage("");
      // console.log("UPLOAD URL:", `${API}/api/media/upload`);
      // console.log("UPLOAD TOKEN:", token);

      // const token = getToken();
      const res = await fetch(`${API}/api/media/upload`, {
        method: "POST",
        // Do not set Content-Type for multipart; the browser sets the boundary.
        // headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        // headers: { Authorization: `Bearer ${token}` },
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
    <div className="bg-light py-4">
      {/* <h2 className="text-center fw-bold m-4">UPLOAD FILES</h2> */}
      <h2 className="text-center fw-semibold mt-2 mb-4 text-primary">
        UPLOAD FILES
      </h2>
      <div className="container d-flex justify-content-center mb-4">
        <div
          className="card shadow-lg border-0"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="card-body p-4">
            <form onSubmit={onSubmit} className="p-3">
              {/* FILE INPUT */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFileChange}
                  className="form-control"
                  required
                />
              </div>

              {/* CATEGORY
              <p className="fw-semibold mb-2">Choose option</p>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value="kitchen"
                    checked={category === "kitchen"}
                    onChange={(e) => setCatogery(e.target.value)}
                    required
                  />
                  <label className="form-check-label">Kitchen</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value="bedroom"
                    checked={category === "bedroom"}
                    onChange={(e) => setCatogery(e.target.value)}
                  />
                  <label className="form-check-label">Bedroom</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value="livingroom"
                    checked={category === "livingroom"}
                    onChange={(e) => setCatogery(e.target.value)}
                  />
                  <label className="form-check-label">Living Room</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value="wardrobe"
                    checked={category === "wardrobe"}
                    onChange={(e) => setCatogery(e.target.value)}
                  />
                  <label className="form-check-label">Wardrobe</label>
                </div>
              </div> */}
              {/* CATEGORY DROPDOWN */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Choose option</label>

                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCatogery(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="livingroom">Living Room</option>
                  <option value="wardrobe">Wardrobe</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Description <span className="text-muted">(optional)</span>
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description for these files"
                  className="form-control"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary mb-4"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {message && <div>{message}</div>}
            </form>
            <div className="text-center mt-3">
              <button
                onClick={() => navigate("/")}
                className="btn fw-semibold p-0 text-warning text-md-secondary link-warning"
              >
                &larr; Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*
      <section className="container mt-5">
        <h4 className="fw-semibold mb-3">Uploaded items</h4>
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
              )}*/}
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
      {/* <div style={{ fontSize: 12, marginTop: 6 }}> */}
      {/* {new Date(it.createdAt).toLocaleString()} */}
      {/*  {new Date(it.createdAt).toLocaleString("en-US", {
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
                      // const token = getToken();
                      // console.log(token, "token");

                      // use authFetch to include Authorization header if token present
                      const dres = await fetch(
                        `${API}/api/media?public_id=${encodeURIComponent(
                          it.public_id
                        )}`,
                        {
                          method: "DELETE",
                          // headers: token
                          //   ? { Authorization: `Bearer ${token}` }
                          //   : undefined,
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
      </section> */}
      {/* <section className="container mt-5">
        <h4 className="fw-semibold mb-3">Uploaded Items</h4>

        {loading && <div className="text-muted">Loading list...</div>}
        {!loading && items.length === 0 && (
          <div className="text-muted">No uploaded items found.</div>
        )}

        <div className="row g-3">
          {items.map((it) => (
            <div key={it._id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                {it.resource_type?.startsWith("image") ? (
                  <img
                    src={it.url}
                    alt={it.public_id || it._id}
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "160px" }}
                  >
                    {it.format || it.resource_type}
                  </div>
                )}

                <div className="card-body p-2">
                  <small className="text-muted d-block mb-2">
                    {new Date(it.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </small>

                  <button
                    className="btn btn-sm btn-outline-danger w-100"
                    onClick={async () => {
                      if (!confirm("Delete this item?")) return;
                      try {
                        setLoading(true);
                        const dres = await fetch(
                          `${API}/api/media?public_id=${encodeURIComponent(
                            it.public_id
                          )}`,
                          { method: "DELETE" }
                        );
                        const djson = await dres.json();
                        if (!dres.ok)
                          setMessage(djson.message || "Delete failed");
                        else {
                          setMessage("Deleted successfully");
                          fetchList();
                        }
                      } catch {
                        setMessage("Delete error");
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <section className="container mt-5">
        <h4 className="text-center fw-semibold mt-2 mb-4 text-primary">
          UPLOADED ITEMS
        </h4>

        {Object.keys(groupedItems).length === 0 && (
          <div className="text-muted">No uploaded items found.</div>
        )}

        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-5">
            {/* CATEGORY TITLE */}
            <h5 className="fw-bold text-primary text-capitalize mb-3">
              {category}
            </h5>

            <div className="row g-3">
              {items.map((it) => (
                <div key={it._id} className="col-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0">
                    {it.resource_type?.startsWith("image") ? (
                      <img
                        src={it.url}
                        alt={it.public_id}
                        className="card-img-top"
                        style={{ height: "160px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "160px" }}
                      >
                        {it.format}
                      </div>
                    )}

                    <div className="card-body p-2">
                      {/* <small className="text-muted d-block mb-2">
                        {new Date(it.createdAt).toLocaleString()}
                      </small> */}

                      {/* DESCRIPTION */}
                      {it.description && (
                        <p
                          className="small text-secondary mb-2"
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                          title={it.description}
                        >
                          {it.description}
                        </p>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger w-100"
                        onClick={async () => {
                          if (!confirm("Delete this item?")) return;
                          try {
                            setLoading(true);
                            await fetch(
                              `${API}/api/media?public_id=${encodeURIComponent(
                                it.public_id
                              )}`,
                              { method: "DELETE" }
                            );
                            fetchList();
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
