import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef(null);
  const laptopRef = useRef(null);
  const welcomeRef = useRef(null);
  const techRef = useRef(null);
  const statsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const laptopArea = laptopRef.current;
      const laptopVisual = laptopArea.querySelector(".laptop");
      const welcome = welcomeRef.current;
      const tech = techRef.current;
      const stats = statsRef.current;
      const words = tech.querySelectorAll(".tech-word");
      const welcomeItems = welcome.querySelectorAll(
        ".eyebrow, h1, .hero-description"
      );

      const isMobile = window.matchMedia("(max-width: 600px)").matches;

      // Initial states
      gsap.set(laptopArea, {
        autoAlpha: 1,
        x: 0,
      });

      gsap.set(laptopVisual, {
        x: isMobile ? -25 : 60,
        autoAlpha: 0,
      });

      gsap.set(welcomeItems, {
        y: 24,
        autoAlpha: 0,
      });

      gsap.set(tech, {
        autoAlpha: 0,
      });

      gsap.set(words, {
        x: 30,
        autoAlpha: 0,
      });

      // Statistics remain in their original layout.
      // Only their entrance animation runs once.
      gsap.set(stats.children, {
        y: 24,
        autoAlpha: 0,
      });

      // Initial laptop entrance
      gsap.to(laptopVisual, {
        x: 0,
        autoAlpha: 1,
        duration: 1.1,
        delay: 0.15,
        ease: "power3.out",
      });

      // Welcome text entrance
      gsap.to(welcomeItems, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.14,
        ease: "power3.out",
      });

      // Statistics entrance from below
      gsap.to(stats.children, {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
        delay: 0.65,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Reversible scroll animation.
      // Only the laptop, welcome text and technology section participate.
      const travel = () => {
        const width = window.innerWidth;

        if (width <= 600) {
          return Math.min(width * 0.04, 12);
        }

        const heroWidth = heroRef.current.clientWidth;

        return Math.min(heroWidth * 0.42, 560);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: () => `+=${window.innerWidth <= 600 ? 700 : 1000}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          laptopArea,
          {
            x: () => -travel(),
            ease: "none",
          },
          0
        )
        .to(
          welcome,
          {
            autoAlpha: 0,
            y: -18,
            ease: "none",
          },
          0
        )
        .to(
          tech,
          {
            autoAlpha: 1,
            ease: "none",
          },
          0.25
        )
        .to(
          words,
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.12,
            ease: "none",
          },
          0.3
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="hero" ref={heroRef} id="home">
      <div className="hero-grid" />

      <nav className="navbar">
        <a className="brand" href="#home">
          ITZ<span>FIZZ</span>
        </a>

        <span className="nav-label">
          CREATIVE MINDS. BOLD IDEAS.
        </span>
      </nav>

      <div className="hero-content">
        <section className="welcome-area" ref={welcomeRef}>
          <p className="eyebrow">WELCOME TO THE FUTURE</p>

        
<h1>
  W E L C O M E
  <br />
  <span>I T Z F I Z Z</span>
</h1>

          <p className="hero-description">
            We turn bold ideas into meaningful digital experiences.
            Technology, creativity and innovation — all in one place.
          </p>
        </section>

        <section className="laptop-area" ref={laptopRef}>
          <div className="laptop">
            <div className="laptop-screen">
              <div className="screen-top">
                <span />
                <span />
                <span />
              </div>

              <div className="screen-content">
                <p className="screen-small">THINK BEYOND</p>

                <h2>
                  THINK
                  <br />
                  CREATE
                  <br />
                  INSPIRE<span>.</span>
                </h2>

                <div className="screen-line" />
              </div>
            </div>

            <div className="laptop-base">
              <div className="laptop-notch" />
            </div>
          </div>

          <p className="laptop-caption">
            BUILDING WHAT COMES NEXT
          </p>
        </section>

        <section className="tech-area" ref={techRef}>
          <p className="eyebrow">WHERE IDEAS BECOME REALITY</p>

          <div className="tech-words">
            <p className="tech-word">
              TECHNOLOGY<span>.</span>
            </p>

            <p className="tech-word">
              INNOVATION<span>.</span>
            </p>

            <p className="tech-word">
              DIGITAL<span>.</span>
            </p>

            <p className="tech-word">
              CREATIVITY<span>.</span>
            </p>
          </div>

          <p className="tech-description">
            A new perspective. A smarter approach.
            Endless possibilities.
          </p>
        </section>

        <div className="stats" ref={statsRef}>
          <div className="stat">
            <strong>
              12<span>+</span>
            </strong>
            <span>IDEAS IN MOTION</span>
          </div>

          <div className="stat">
            <strong>
              85<span>+</span>
            </strong>
            <span>PROJECTS INSPIRED</span>
          </div>

          <div className="stat">
            <strong>24/7</strong>
            <span>CREATIVE ENERGY</span>
          </div>
        </div>
      </div>

      <p className="scroll-note">
        SCROLL TO EXPLORE <span>↓</span>
      </p>
    </main>
  );
}