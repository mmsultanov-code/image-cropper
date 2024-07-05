import styles from './styles.module.scss';

export const PageHead = (props: { 
    title: string; 
    backgroundUrl: string; 
    whiteText?: boolean; 
}) => {
    const { title, backgroundUrl, whiteText } = props;
    // Determine classes based on props
    const sectionClass = `${styles.pageHeadSection} ${whiteText ? styles.whiteText : ''}`;
    
    return (
        <section className={sectionClass} style={{
                backgroundImage: `url(${backgroundUrl})`,
                backgroundSize: 'cover'
            }}>
            <div className="wrapper-inside">
                <div className="container">
                    <h1>{title}</h1>
                </div>
            </div>
        </section>
    );
};