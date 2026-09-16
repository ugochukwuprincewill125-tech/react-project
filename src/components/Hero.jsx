import { Link } from "react-router-dom";
import "./Hero.css";
import Game1Image from "../assets/hero/game.png";
import Earpods from "../assets/hero/earpods.webp";
import Headset from "../assets/hero/headset.png";
import MemoryCard from "../assets/hero/memorycard.png";
import Tp from "../assets/hero/tp.png";
import Mouse from "../assets/hero/mouse.png";
import RouterImg from "../assets/hero/router.png";
import Tripod from "../assets/hero/tripod.png";
import ZealotImg from "../assets/hero/zealot.png";

function Hero() {
  const heroImages = [
    Game1Image,
    Earpods,
    Headset,
    MemoryCard,
    Tp,
    Mouse,
    RouterImg,
    Tripod,
    ZealotImg,
  ];

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Computer Village, Ikeja, Lagos</span>
          <h1 className="hero__headline">Technology that moves with you.</h1>
          <p className="hero__subtext">
            Shop quality gadgets, computer accessories, phone accessories,
            networking products, storage devices and more — at competitive
            prices.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn-primary">
              Shop Products
            </Link>
            <Link to="/categories" className="btn btn-outline-dark">
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`hero__tile ${i === 4 ? "hero__tile--accent" : ""}`}
              >
                <img src={heroImages[i]} alt={`Item ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
