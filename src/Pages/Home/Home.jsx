import IntroduceCollage from "./HomeChildren/CollageIntrduce/IntroduceCollage";
import ImageGalery from "./HomeChildren/ImageGalary/ImageGalery";
import ResearchPaper from "./HomeChildren/ResearchPaper/ResearchPaper";
import SearchCollage from "./HomeChildren/SearchCollage/SearchCollage";
import Reviews from "./Reviews/Reviews";

const Home = () => {
    return (
        <>
        <SearchCollage></SearchCollage>
        <IntroduceCollage></IntroduceCollage>
        <ImageGalery></ImageGalery>
        <ResearchPaper></ResearchPaper>
        <Reviews></Reviews>
        </>
    );
};
export default Home;