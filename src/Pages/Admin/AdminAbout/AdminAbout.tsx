import AboutStoryComponent from "../../..//Components/Admin/About/AboutStoryComponent";
import AboutCompany from "../../../Components/Admin/About/AboutCompany";
import AboutHeroComponent from "../../../Components/Admin/About/AboutHeroComponent";
import MVCComponent from "../../../Components/Admin/About/MVC_ComponentAdmin";

export default function About() {
  return (
    <div>
      <AboutHeroComponent />
      <AboutStoryComponent />
      <AboutCompany />

      <MVCComponent />
    </div>
  );
}
