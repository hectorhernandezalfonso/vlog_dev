import React from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/posts.json';


interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];  
  };
  content: string;
}

const Home = () => {
  
  const posts = postsData as Post[];

  if (!posts || posts.length === 0) {
    return <p>No posts yet. Run `npm run build:posts` to generate.</p>;
  }

  return (
    <div>
      <h1>My Vlog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/post/${post.slug}`}>
              {post.frontmatter.title} - {post.frontmatter.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 11. Export the component so it can be used in App.tsx
export default Home;