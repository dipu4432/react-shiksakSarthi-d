import React, { useState, useEffect, useRef } from 'react'
import './ProjectPage.css'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../designIdeas/context/userContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ProjectPage = () => {
  const fileInputRef = useRef(null);

  // Posts state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingPost, setEditingPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  // Form state for post
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });


  // Image handling state
  const [selectedImages, setSelectedImages] = useState([]); // New images to upload
  const [existingImages, setExistingImages] = useState([]); // Images already on server (for edit)
  const [previewUrls, setPreviewUrls] = useState([]); // Preview URLs for selected images



  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Open modal for creating new post
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingPost(null);
    setPostForm({
      title: '',
      content: ''
    });
    setSelectedImages([]);
    setExistingImages([]);
    setPreviewUrls([]);
    setShowModal(true);
  };

  // Open modal for editing existing post
  const handleOpenEditModal = (e, post) => {
    e.preventDefault();
    e.stopPropagation();

    setModalMode('edit');
    setEditingPost(post);
    setPostForm({
      title: post.title || '',
      content: post.content || ''
    });
    setSelectedImages([]);
    setExistingImages(post.images || []);
    setPreviewUrls([]);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPost(null);
    setSelectedImages([]);
    setExistingImages([]);
    setPreviewUrls([]);
  };

  // Handle post form input changes
  const handlePostFormChange = (e) => {
    const { name, value } = e.target;
    setPostForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Add to selected images
    setSelectedImages(prev => [...prev, ...files]);

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  // Remove a newly selected image
  const handleRemoveSelectedImage = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Remove an existing image (for edit mode)
  const handleRemoveExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  // Submit post (create or update)
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postForm.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (selectedImages.length === 0 && existingImages.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('title', postForm.title);
      formDataToSend.append('content', postForm.content);

      // Append new images
      selectedImages.forEach(file => {
        formDataToSend.append('images', file);
      });

      // For edit mode, send existing images that should be kept
      if (modalMode === 'edit') {
        formDataToSend.append('existingImages', JSON.stringify(existingImages));
      }

      const url = modalMode === 'create'
        ? `${API_BASE_URL}/api/posts`
        : `${API_BASE_URL}/api/posts/${editingPost._id}`;

      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Post ${modalMode === 'create' ? 'created' : 'updated'} successfully!`);
        handleCloseModal();
        fetchPosts(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to save post');
      }
    } catch (err) {
      console.error('Submit post error:', err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete post
  const handleDeletePost = async (e, postId) => {
    e.preventDefault();
    e.stopPropagation();

    toast((t) => (
      <div className="confirm-toast">
        <p>Are you sure you want to delete this post?</p>
        <div className="confirm-toast-actions">
          <button
            className="confirm-toast-btn cancel"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="confirm-toast-btn delete"
            onClick={async () => {
              setLoading(true);
              toast.dismiss(t.id);
              try {
                const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
                  method: 'DELETE'
                });

                const data = await response.json();

                if (data.success) {
                  setLoading(false)
                  toast.success('Post deleted successfully!');
                  fetchPosts();
                } else {
                  setLoading(false)
                  throw new Error(data.message || 'Failed to delete post');
                }
              } catch (err) {
                console.error('Delete post error:', err);
                toast.error(`Error: ${err.message}`);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: '#fff',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      },
    });
  };



  // Get display image for card
  const getPostImage = (post) => {
    if (post.images && post.images.length > 0) {
      return post.images[0].url || post.images[0];
    }
    return 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80';
  };

  return (
    <div className="project-page">
      {/* Projects Grid Section */}
      <section className="projects-section">
        <div className="projects-container">
          {/* Upload Button - Floating */}
          {user && (

            <button className="upload-post-btn" onClick={handleOpenCreateModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Upload Post
            </button>
          )}

          {/* Section Header */}
          <div className="projects-header mb-4">
            <h1 className="fw-bold text-center mb-5 bold" style={{ color: '#333' }}>We have completed multiple successful project story which you can view here</h1>
          </div>

          {/* Loading/Error States */}
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          )}

          {error && !loading && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchPosts}>Try Again</button>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <div className="row g-3 g-md-4 justify-content-center">
              {posts.map((post) => (
                <div key={post._id} className="col-12 col-lg-4">
                  <Link className='project-page-link text-decoration-none' to={`/project-details/${post._id}`}>
                    <div className="card h-100 shadow-sm border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
                      {/* Card Image */}
                      <div className="position-relative">
                        <img
                          src={getPostImage(post)}
                          alt={post.title}
                          className="card-img-top"
                          style={{ height: '280px', objectFit: 'cover' }}
                        />
                        {/* Image Count Badge */}
                        <div className="position-absolute top-0 end-0 badge bg-dark bg-opacity-75 m-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="me-1">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                          </svg>
                          <span>{post.images?.length || 1}</span>
                        </div>

                        {/* Edit/Delete Buttons */}
                        {user && (
                          <div className="position-absolute top-0 start-0 d-flex gap-1 m-2">
                            <button
                              className="btn btn-sm btn-light"
                              onClick={(e) => handleOpenEditModal(e, post)}
                              title="Edit Post"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              className="btn btn-sm btn-light"
                              onClick={(e) => handleDeletePost(e, post._id)}
                              title="Delete Post"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      {/* Card Body */}
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold mb-2 text-truncate" style={{ color: '#333' }}>{post.title}</h5>
                        <div className="mt-auto">
                          <button className="btn btn-primary w-100" onClick={(e) => e.stopPropagation()}>
                            Explore more
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && posts.length === 0 && (
            <div className="empty-state">
              <p>No projects found.</p>
              {
                user && (
                  <button onClick={handleOpenCreateModal}>Create Post</button>
                )
              }
            </div>
          )}
        </div>
      </section>

      {/* Upload/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalMode === 'create' ? 'Create New Post' : 'Edit Post'}</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="modal-form" onSubmit={handlePostSubmit}>
              {/* Title - Full Width */}
              <div className={`floating-group ${postForm.title ? 'has-value' : ''}`}>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postForm.title}
                  onChange={handlePostFormChange}
                  required
                  autoComplete="off"
                />
                <label htmlFor="title">Post Title *</label>
              </div>

              {/* Content/Description - Full Width */}
              <div className={`floating-group ${postForm.content ? 'has-value' : ''}`}>
                <textarea
                  id="content"
                  name="content"
                  value={postForm.content}
                  onChange={handlePostFormChange}
                  rows="4"
                  required
                />
                <label htmlFor="content">Description</label>
              </div>

              {/* Image Upload */}
              <div className="upload-section">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <div
                  className="drop-zone"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                  onDragLeave={(e) => { e.currentTarget.classList.remove('drag-over'); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('drag-over');
                    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                    if (files.length > 0) {
                      setSelectedImages(prev => [...prev, ...files]);
                      const newPreviews = files.map(file => URL.createObjectURL(file));
                      setPreviewUrls(prev => [...prev, ...newPreviews]);
                    }
                  }}
                >
                  <div className="drop-zone-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17,8 12,3 7,8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <span className="drop-zone-text">Click to upload images</span>
                  <span className="drop-zone-hint">or drag and drop • max 10 images</span>
                </div>

                {/* Existing Images (Edit Mode) */}
                {existingImages.length > 0 && (
                  <div className="preview-section">
                    <p className="preview-title">Current Images</p>
                    <div className="preview-grid">
                      {existingImages.map((img, index) => (
                        <div key={`existing-${index}`} className="preview-item">
                          <img src={img.url || img} alt={`Existing ${index + 1}`} />
                          <button
                            type="button"
                            className="preview-remove"
                            onClick={() => handleRemoveExistingImage(index)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Image Previews */}
                {previewUrls.length > 0 && (
                  <div className="preview-section">
                    <p className="preview-title">New Images</p>
                    <div className="preview-grid">
                      {previewUrls.map((url, index) => (
                        <div key={`new-${index}`} className="preview-item">
                          <img src={url} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="preview-remove"
                            onClick={() => handleRemoveSelectedImage(index)}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting
                    ? (modalMode === 'create' ? 'Creating...' : 'Updating...')
                    : (modalMode === 'create' ? 'Create Post' : 'Update Post')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectPage