export const Tile = () => (
    <article>
        <span className="image">
            <img src="images/pic01.jpg" alt="" />
        </span>
        <header className="major">
            <h3><a href="landing.html" className="link">Aliquam</a></h3>
            <p>Ipsum dolor sit amet</p>
        </header>
    </article>
);

export const Tiles = props => (
    <section id="one" className="tiles">
        {props.children}
    </section>
);
