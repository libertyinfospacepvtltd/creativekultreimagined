interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
  <div className="text-center p-4 sm:p-6 md:p-8">
    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-primary mb-1 sm:mb-2">
      {value}
    </div>
    <div className="text-[10px] sm:text-xs md:text-sm font-sans text-muted-foreground uppercase tracking-wider">
      {label}
    </div>
  </div>
);

const StatsSection = () => {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "3", label: "Divisions Powered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "∞", label: "Creative Ideas" },
  ];

  return (
    <section className="relative z-30 bg-background border-y border-border/30">
      <div className="container-luxury">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;