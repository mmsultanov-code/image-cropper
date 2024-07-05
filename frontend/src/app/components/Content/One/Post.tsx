import styles from './styles.module.scss'
import Link from 'next/link';

export const OnePost = (props: {title: string, thumbnail: string, excerpt: string, link: string}) => {
    const { title, thumbnail, excerpt, link } = props;
    return (
        <Link href={link} className={styles.oneBlockPost}>
            <div className="thumbnail-side">
                <img src={thumbnail} alt="" />
            </div>
            <div className="content-side">
                <strong>{title}</strong>
                <p>{excerpt}</p>
                <span className="read-more-link">читать далее...</span>
            </div>
        </Link>
    )
}