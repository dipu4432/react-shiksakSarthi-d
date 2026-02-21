import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link 
      to={blog.link}
      className="text-decoration-none text-dark"
    >
      <div className="card h-100 border-0 shadow-sm blog-card">
        <img
          src={blog.image}
          className="card-img-top rounded-3"
          alt={blog.title}
        />

        <div className="card-body px-0">
          <h5 className="fw-semibold mt-3">
            {blog.title}
          </h5>

          <p className="text-muted small mb-0">
            {blog.author && `${blog.author} / `}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
