import { useParams, Navigate} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import postData from '../data/posts.json'


interface Post {
    slug: string;
    frontmatter:{
        title: string;
        date: string;
    };
    content: string;
};


const PostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const posts = postData as Post[];
    const post = posts.find((p => p.slug === slug));
    if (!post){
        return <Navigate to="/" />;
    }

    return (
        <article>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    )
};

export default PostDetail;