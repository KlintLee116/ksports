import { CSSProperties } from 'react'

const styles: { [key: string]: CSSProperties } = {
    a: {
        textDecoration: "none",
        display: "block"
    }
}

export default function Footer() {

    return <footer style={{ textDecoration: "none", 
    borderTop:"1px solid grey", paddingTop:"5vh", marginTop:"10vh" }}>
        <a style={styles.a} href="https://www.flaticon.com/free-icons/hamburger" title="hamburger icons">Hamburger icons created by Lizel Arina - Flaticon</a>
        <a style={styles.a} href="https://www.flaticon.com/free-icons/smart-cart" title="smart cart icons">Smart cart icons created by Freepik - Flaticon</a>
        <a style={styles.a} href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Catalin Fertu - Flaticon</a>
    </footer>
}