import PricingCard from '../pricing-card';

export default function PricingSection() {
  return (
    <section>
      {/* Title */}
      <div className="text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Find a plan that fits your goals
        </h1>
      </div>

      {/* dotted background strip */}
      <div className="relative mt-10">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(rgba(15,23,42,0.25) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Cards */}
        <div className="grid gap-6 py-8 md:grid-cols-3">
          <PricingCard
            variant="basic"
            title="Basic"
            price="£0"
            period="Always free"
            description="Start learning something new with basic access"
            cta="Sign up"
          />

          <PricingCard
            variant="plus"
            title="Plus"
            pill="Learn a skill"
            price="£11.99"
            period="/mo"
            subText={['Billed annually', 'or £23.99 billed monthly']}
            description="Build in-demand technical skills for work or a personal project"
            bulletTitle="Everything in Basic and more"
            cta="Try Plus for free"
          />

          <PricingCard
            variant="pro"
            recommended
            title="Pro"
            pill="Build a career"
            price="£15.99"
            period="/mo"
            subText={['Billed annually', 'or £31.99 billed monthly']}
            description="Develop the experience to land a job and move up in your career"
            bulletTitle="Everything in Plus and more"
            cta="Try Pro for free"
          />
        </div>
      </div>
    </section>
  );
}
