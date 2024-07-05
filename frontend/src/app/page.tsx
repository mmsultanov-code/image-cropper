'use client'

import Image from "next/image";
import { PageHead } from "@/app/components/PageHead/PageHead";
import { OnePost } from "@/app/components/Content/One/Post";
import { useState, useEffect } from 'react';

// Получаем значение хоста из переменных окружения
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Home() {
  const [posts, setData] = useState([])

  useEffect(() => {
    fetch(`${API_HOST}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <main>
      <PageHead title="Страница блога" whiteText={true} backgroundUrl="https://catherineasquithgallery.com/uploads/posts/2021-02/1613259762_71-p-sinii-futbolnii-fon-88.jpg" />
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
          <div className="main-blog-posts-container">
            {posts.length > 0 ? posts.map((post, post_index) => (
              <OnePost
                key={post_index}
                title={post.name}
                thumbnail={`${API_HOST}${post.thumbnail}`}
                link={`/blog/${post.slug}`}
              />
            )) : (
              <p>Загрузка...</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}