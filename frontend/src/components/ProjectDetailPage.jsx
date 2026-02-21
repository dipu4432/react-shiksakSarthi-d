import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetailPage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper function to get high-quality Unsplash image URL
const getHighQualityImageUrl = (url, width = 1920, height = 1080) => {
  if (!url) return url;
  // If it's a Cloudinary URL, return as is
  if (url.includes('cloudinary')) return url;
  // Remove existing size parameters and add high-quality ones
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?w=${width}&h=${height}&fit=crop&q=90`;
};

// Helper function to get thumbnail URL (higher quality for gallery preview)
const getThumbnailUrl = (url, width = 800, height = 600) => {
  if (!url) return url;
  // If it's a Cloudinary URL, return as is
  if (url.includes('cloudinary')) return url;
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?w=${width}&h=${height}&fit=crop&q=85`;
};

const ProjectDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Post state from API
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch post from API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/posts/${id}`);
        const data = await response.json();

        if (data.success) {
          // Transform images to URL array for compatibility
          const transformedPost = {
            ...data.data,
            images: data.data.images?.map(img => img.url || img) || []
          };
          setPost(transformedPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Fetch post error:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Lightbox handlers
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen || !post) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex, post]);



  // Loading state
  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return <div className="project-detail-error">{error || 'Project not found'}</div>;
  }

  // console.log('Post data:', post);
  // console.log('Images array:', post.images);

  return (
    <div className="project-detail-page">
      {/* Main Content */}
      <div className="content-wrapper">
        <div className="main-content">
          {/* Project Header Section */}
          <header className="project-header">
            <h1 className="project-title">{post.title}</h1>
          </header>

          {/* Project Content Section */}
          
              <p className='pb-4'>{post.content}</p>
          {/* Design Highlights */}
          {post.images && post.images.length > 0 && (
            <section className="design-highlights">
              <h2 className="section-title">Design Highlights</h2>
              <div className="carousel-container">
                <button
                  className="carousel-nav prev"
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? post.images.length - 1 : prev - 1))}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <div className="carousel-track">
                  <img
                    src={getThumbnailUrl(post.images[currentImageIndex], 1200, 800)}
                    alt={`Design highlight ${currentImageIndex + 1}`}
                    className="carousel-image"
                    onError={(e) => {
                      console.error('Image failed to load:', post.images[currentImageIndex]);
                      e.target.src = 'https://via.placeholder.com/350x250?text=Image+Not+Available';
                    }}
                  />
                </div>
                <button
                  className="carousel-nav next"
                  onClick={() => setCurrentImageIndex((prev) => (prev === post.images.length - 1 ? 0 : prev + 1))}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;