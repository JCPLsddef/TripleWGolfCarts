export function HeroVisual() {
  return (
    <section className="py-12 lg:py-16 bg-bg">
      <div className="container-default">
        <p className="text-center text-text-muted text-sm mb-6 font-medium">
          Event-ready golf carts, delivered and set up on-site.
        </p>
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://static.wixstatic.com/media/62f926_8d090e3b546644e7be2ae564fe27d402~mv2.png"
            alt="Event-ready golf carts delivered and set up at venue"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
