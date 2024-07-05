
'use client'
import Image from "next/image";
import { PageHead } from "@/app/components/PageHead/PageHead";
import { OnePost } from "@/app/components/Content/One/Post";
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export default function BlogSinglePost() {
    const router = useParams();
    const { slug } = router;
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            if (slug) {
                try {
                    const response = await fetch(`http://localhost:7000/api/posts/${slug}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPost(data);
                    } else {
                        throw new Error(`Failed to fetch post with slug ${slug}`);
                    }
                } catch (error) {
                    console.error(error);
                    // Handle error fetching post
                }
            }
        }
        fetchPost();
    }, [slug]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <PageHead title={post.name} whiteText={false} backgroundUrl={post.thumbnail} />
            <div className="container">
                <div className="blog-template-layout">
                    <aside className="main-sidebar">
                        <div className="widget-side">
                            <strong className="widget-name">Категории</strong>
                            <nav className="categories">
                                <ul>
                                    <li><a href="#">Мировые новости</a></li>
                                    <li><a href="#">Новости Великобритании</a></li>
                                    <li><a href="#">Климатический кризис</a></li>
                                    <li><a href="#">Окружающая среда</a></li>
                                    <li><a href="#">Наука</a></li>
                                    <li><a href="#">Глобальное развитие</a></li>
                                    <li><a href="#">Футбол</a></li>
                                    <li><a href="#">Технологии</a></li>
                                    <li><a href="#">Бизнес</a></li>
                                </ul>
                            </nav>
                        </div>
                    </aside>
                    <div className="main-blog-post">
                        <div className="post-thumbnail">
                            <img src={API_HOST + post.background_image} alt={post.title} />
                        </div>
                        <div className="content-side">
                            <h2>{post.title}</h2>
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}