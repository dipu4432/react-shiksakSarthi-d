import blogs from "./blog";
import BlogCard from "./blogCard";

const Magazine = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">
          Browse through our magazine
        </h2>
        <p className="text-muted">
          Take a look at our magazine to get tips and inspirations on the best
          interiors in Jaipur
        </p>
      </div>

      {/* Blog Grid */}
      <div className="row g-4">
        {blogs.map((blog) => (
          <div className="col-md-6 col-lg-4" key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Magazine;
