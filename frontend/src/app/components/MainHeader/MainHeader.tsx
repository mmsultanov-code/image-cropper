import styles from './styles.module.scss'
import Link from 'next/link'

export default function MainHeader() {
    return (
        <header id="main-header" className={styles.mainHeader}>
            <div className="wrapper-inside">
                <div className="container">
                    <div className="flex-side space">
                        <div className="main-logo">
                            <Link href="/">
                                <strong>Test <span>App</span></strong>
                            </Link>
                        </div>
                        <nav className="main-navigation">
                            <ul>
                                <li><a href="#">Products</a></li>
                                <li><a href="#">Docs</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">SignIn</a></li>
                            </ul>
                        </nav>
                        <a href="#" className="theme-button orange">Sign Up - Free</a>
                    </div>
                </div>
            </div>
        </header>
    )
}