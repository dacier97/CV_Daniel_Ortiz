const CVTemplate = ({ data, isAtsFriendly = false }: { data: any, isAtsFriendly?: boolean }) => {
    if (!data) return null;
    const { personalInfo, objective, skills, experience, education, themeColor } = data;
    const secondaryColor = themeColor || "#FF5E1A";

    // ATS Mode Styles
    if (isAtsFriendly) {
        return (
            <div className="w-full max-w-[850px] mx-auto bg-white p-12 md:p-16 text-[#333] font-serif leading-relaxed selection:bg-gray-200">
                {/* Simplified Header */}
                <header className="border-b-2 border-gray-900 pb-6 mb-8 text-center">
                    <h1 className="text-4xl font-bold uppercase tracking-tight text-black mb-2">{personalInfo.name} {personalInfo.lastName}</h1>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                        {personalInfo.contactInfo.map((info: any) => (
                            <span key={info.id}>{info.value}</span>
                        ))}
                    </div>
                </header>

                <div className="space-y-10">
                    {/* Objective */}
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Professional Summary</h2>
                        <p className="text-sm">{objective}</p>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
                        <div className="space-y-8">
                            {experience.map((exp: any) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-black uppercase">{exp.title}</h3>
                                        <span className="text-sm font-bold">{exp.period}</span>
                                    </div>
                                    <p className="text-sm italic mb-3">{exp.description}</p>
                                    <ul className="list-disc ml-5 space-y-1">
                                        {exp.bullets.map((bullet: string, idx: number) => (
                                            <li key={idx} className="text-sm">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                        <div className="space-y-6">
                            {education?.map((edu: any) => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="text-base font-bold uppercase">{edu.degree}</h3>
                                        <p className="text-sm">{edu.institution}</p>
                                    </div>
                                    <span className="text-sm font-bold">{edu.period}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Skills</h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {skills.professional.map((skill: string, index: number) => (
                                <span key={index} className="text-sm flex items-center gap-2">
                                    • {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // Original Premium Mode
    return (
        <div className="w-full max-w-[850px] mx-auto bg-white shadow-2xl my-4 md:my-16 p-6 md:p-16 min-h-[1100px] flex flex-col text-foreground selection:bg-primary/30 rounded-none md:rounded-lg font-sans">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 md:mb-20 gap-8 md:gap-0">
                <div className="relative group shrink-0">
                    {/* Yellow Decorative Shape - Responsive position */}
                    <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-40 h-48 md:w-52 md:h-60 bg-accent-yellow/80 rounded-[1.5rem] md:rounded-[2rem] -z-10 rotate-[-5deg] transition-transform group-hover:rotate-0 duration-500"></div>
                    <div className="w-40 h-48 md:w-52 md:h-60 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm relative z-0">
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.name}
                            className="w-full h-full object-cover transition-scale duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="flex-1 md:ml-12 lg:ml-20 mt-0 md:mt-6 text-center md:text-left">
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-xl md:text-3xl font-light tracking-[0.4em] text-gray-400 uppercase leading-none font-display">{personalInfo.name}</h2>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-[0.05em] text-foreground mt-3 md:mt-4 leading-none font-display">{personalInfo.lastName}</h1>
                    </div>

                    <div className="relative inline-flex items-center mt-2 md:mt-6">
                        {/* Small Orange Arrow Component - Hidden on mobile if centered */}
                        <div
                            className="hidden md:block absolute -left-3 w-4 h-4 clip-path-triangle"
                            style={{ backgroundColor: secondaryColor }}
                        ></div>
                        <div
                            className="text-white px-6 md:px-10 py-2 md:py-3 rounded-full font-bold tracking-[0.1em] text-xs md:text-sm uppercase shadow-lg shadow-black/10"
                            style={{ backgroundColor: secondaryColor }}
                        >
                            {personalInfo.role}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Split */}
            <div className="flex flex-col md:flex-row flex-1 gap-8 md:gap-12">
                {/* Left Column - Sidebar Style */}
                <aside className="w-full md:w-[32%] flex flex-col gap-10 md:gap-16">
                    <section>
                        <h3 className="text-lg md:text-xl font-bold tracking-[0.15em] uppercase mb-4 md:mb-6 text-foreground font-display">Contact Info</h3>
                        <ul className="space-y-3 md:space-y-4">
                            {personalInfo.contactInfo.map((info: any) => (
                                <li key={info.id} className="flex items-center gap-3 md:gap-4 group">
                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground rounded-full transition-transform group-hover:scale-125"></span>
                                    <span className="text-xs md:text-sm font-medium text-gray-600 transition-colors group-hover:text-foreground break-all">{info.value}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg md:text-xl font-bold tracking-[0.15em] uppercase mb-6 md:mb-8 text-foreground font-display">Skills</h3>
                        <div>
                            <h4 className="text-[10px] md:text-xs font-black uppercase text-gray-400 mb-4 md:mb-6 tracking-[0.2em] border-b border-gray-100 pb-2">Professional</h4>
                            <ul className="space-y-3 md:space-y-4">
                                {skills.professional.map((skill: string, index: number) => (
                                    <li key={index} className="flex items-center gap-3 md:gap-4 group">
                                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground rounded-full transition-transform group-hover:scale-125"></span>
                                        <span className="text-xs md:text-sm font-medium text-gray-600 transition-colors group-hover:text-foreground">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </aside>

                {/* Right Column - Main Content */}
                <main className="flex-1 md:pl-12 md:border-l border-gray-100">
                    {/* Objective */}
                    <section className="mb-12 md:mb-20 relative pt-0 md:pt-2">
                        <div className="hidden md:block absolute left-[-49px] top-0 bottom-0 w-[2px] bg-gray-200"></div>
                        <p className="text-sm md:text-[15px] leading-relaxed text-gray-600 italic font-medium">
                            "{objective}"
                        </p>
                    </section>

                    {/* Experience Section */}
                    <section className="mb-16">
                        <h3 className="text-lg md:text-xl font-bold tracking-[0.15em] uppercase mb-8 md:mb-12 text-foreground font-display">Experience</h3>
                        <div className="space-y-10 md:space-y-16">
                            {experience.map((exp: any) => (
                                <div key={exp.id} className="relative group">
                                    <div className="mb-4 md:mb-6">
                                        <p className="text-[10px] md:text-xs font-black text-gray-400 mb-2 md:mb-3 tracking-[0.2em] uppercase">{exp.period}</p>
                                        <h4 className="text-sm md:text-base font-bold tracking-widest uppercase text-foreground leading-snug">{exp.title}</h4>
                                    </div>
                                    <p className="text-xs md:text-[14px] leading-relaxed text-gray-600 mb-4 md:mb-6 font-medium">{exp.description}</p>
                                    <ul className="space-y-2 md:space-y-3">
                                        {exp.bullets.map((bullet: string, idx: number) => (
                                            <li key={idx} className="flex gap-2 md:gap-3 text-xs md:text-[14px] text-gray-600 leading-relaxed font-sans">
                                                <span
                                                    className="mt-1.5 md:mt-2 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: secondaryColor + '80' }} // with opacity
                                                ></span>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section>
                        <h3 className="text-lg md:text-xl font-bold tracking-[0.15em] uppercase mb-8 md:mb-12 text-foreground font-display">Education</h3>
                        <div className="space-y-10">
                            {education?.map((edu: any) => (
                                <div key={edu.id} className="relative group">
                                    <div className="mb-2">
                                        <p className="text-[10px] md:text-xs font-black text-gray-400 mb-2 tracking-[0.2em] uppercase">{edu.period}</p>
                                        <h4 className="text-sm md:text-base font-bold tracking-widest uppercase text-foreground leading-snug">{edu.degree}</h4>
                                        <p className="text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">{edu.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CVTemplate;
