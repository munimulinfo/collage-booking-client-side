
const ResearchPaper = () => {
    return (
        <div className="lg:px-10 px-2">
            <div className="flex flex-col gap-4 mb-20 justify-start bg-purple-50 px-4 py-5 lg:px-10 lg:py-10 rounded-lg">
                <h1 className="lg:text-3xl text-[20px] text-center font-bold font-sans mb-10 lg:mb-20">Researched by the college students</h1>
                <div>
                    <h1 className="text-2xl font-bold font-sans">Social Science Research Network</h1>
                    <p className="text-[20px] font-semibold font-sans"> Social Science Research Network is a website that provides access to academic papers in the social sciences and humanities.</p>
                    <p className="link link-primary">https://ssrn.com</p>
                </div>
                <div>
                    <h1 className="text-2xl font-bold font-sans">arXiv is a repository of e-prints in physics</h1>
                    <p className="text-[18px] font-semibold font-sans">arXiv is a repository of e-prints in physics, mathematics, computer science, quantitative biology, quantitative finance, statistics, electrical engineering and systems science, and economics.</p>
                    <p className="link link-primary">https://arxiv.org</p>
                </div>
                <div>
                    <h1 className="text-2xl font-bold font-sans">ProQuest </h1>
                    <p className="text-[18px] font-semibold font-sans">ProQuest is a database of academic journals, books, and other scholarly literature.</p>
                    <p className="link link-primary">https://www.proquest.com/</p>
                </div>
                <div>
                    <h1 className="text-2xl font-bold font-sans">EBSCOhost </h1>
                    <p className="text-[18px] font-semibold font-sans"> EBSCOhost is a database of academic journals, magazines, newspapers, books, and other scholarly literature.</p>
                    <p className="link link-primary">https://www.ebscohost.com</p>
                </div>
            </div>
        </div>
    );
};

export default ResearchPaper;