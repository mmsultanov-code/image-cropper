import Image from "next/image";
import { PageHead } from "@/app/components/PageHead/PageHead";
import { OnePost } from "@/app/components/Content/One/Post";

export default function Home() {
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
						<OnePost
							title="Красный футбольный фон"
							thumbnail="https://catherineasquithgallery.com/uploads/posts/2021-02/1612896868_147-p-krasnii-futbolnii-fon-245.jpg"
							excerpt="Сборные Нидерландов и Турции стали последними четвертьфиналистами чемпионата Европы по футболу 2024 года, проходящего в Германии. Об этом сообщает корреспондент «Ленты.ру»."
							link="/blog/simple-post" />
						<OnePost
							title="Открытки в мире футбола"
							thumbnail="https://furman.top/uploads/posts/2023-08/1690921873_furman-top-p-futbol-stadion-fon-krasivo-12.jpg"
							excerpt="Сборные Нидерландов и Турции стали последними четвертьфиналистами чемпионата Европы по футболу 2024 года, проходящего в Германии. Об этом сообщает корреспондент «Ленты.ру»."
							link="/blog/simple-post" />
						<OnePost
							title="Синий футбольный фон (188 фото)"
							thumbnail="https://catherineasquithgallery.com/uploads/posts/2021-02/1613259763_16-p-sinii-futbolnii-fon-21.jpg"
							excerpt="Сборные Нидерландов и Турции стали последними четвертьфиналистами чемпионата Европы по футболу 2024 года, проходящего в Германии. Об этом сообщает корреспондент «Ленты.ру»."
							link="/blog/simple-post" />
						<OnePost
							title="Футбол стадион фон"
							thumbnail="https://furman.top/uploads/posts/2023-08/1690921850_furman-top-p-futbol-stadion-fon-krasivo-11.jpg"
							excerpt="Сборные Нидерландов и Турции стали последними четвертьфиналистами чемпионата Европы по футболу 2024 года, проходящего в Германии. Об этом сообщает корреспондент «Ленты.ру»."
							link="/blog/simple-post" />
					</div>
				</div>
			</div>
		</main>
	);
}
