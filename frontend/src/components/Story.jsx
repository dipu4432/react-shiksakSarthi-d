import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import storyData from "../designIdeas/data/storyData.json"
import './Story.css'

const Story = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("query");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  const data = storyData[category];

  if (!data) {
    return (
      <div className="story-container">
        <div className="story-error-message">
          <h2>Story not found</h2>
          <p>The requested story could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <div className="story-content-wrapper">
        {/* Main Content Column */}
        <article className="story-article">
          {/* Header Section */}
          <header className="story-header">
            <div className="story-category-badge">{category}</div>
            <h1 className="story-title">{data.title}</h1>
            {/* <time className="story-date" dateTime={data.date}>
              {new Date(data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time> */}
          </header>

          {/* Story Content - Show one by one */}
          <div className="story-content">
            {data.story.map((item, index) => (
              <div key={index} className="story-section">
                <div className="story-section-content">
                  <h2 className="story-section-title">{item.title}</h2>
                  <p className="story-text">
                    {item.description}
                  </p>
                </div>
                <div className="story-image-wrapper">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="story-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

      </div>
    </div>
  )
}

export default Story