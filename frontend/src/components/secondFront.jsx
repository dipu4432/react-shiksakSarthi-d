import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Template from "../designIdeas/template/designIdeas";
import TemplateForCities from "../designIdeas/template/templateForCities";
import Furniture from "../designIdeas/template/furniture";

const SecondFront = ({ onQuoteClick }) => {
  const { designType } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [designType]);

  // console.log("designType: ", designType);

  // Decide API based on button clicked
  const apiMap = {
    modularKitchen: "design1",
    wardrobe: "design2",
    bathroom: "design3",
    masterBedroom: "design4",
    livingroom: "design5",
    poojaroom: "design6",
    tvUnit: "design7",
    falseCelling: "design8",
    kidsBedroom: "design9",
    balcony: "design10",
    diningRoom: "design11",
    foyer: "design12",
    homesByColoursKitchen: "design13",
    homeOffice: "design14",
    guestBedroom: "design15",
    window: "design16",
    flooring: "design17",
    wallDecor: "design18",
    wallPaint: "design19",
    homeWallpaper: "design20",
    tile: "design21",
    studyroom: "design22",
    kitchenSinks: "design23",
    spaceSavingDesign: "design24",
    door: "design25",
    staircase: "design26",
    crockeryUnit: "design27",
    homeBar: "design28"
  };

  const designFolderMap = {
  modularKitchen: "kitchen",
  wardrobe: "Wardrobe",
  bathroom: "Bathroom",
  masterBedroom: "Bedroom",
  livingroom: "LivingRoom",
  poojaroom: "PoojaRoom",
  tvUnit: "tvUnit",
  falseCelling: "falseCelling",
  kidsBedroom: "KidsBedroom",
  balcony: "Balcony",
  diningRoom: "DiningRoom",
  foyer: "Foyer",
  homesByColoursKitchen: "homesByColoursKitchen",
  homeOffice: "HomeOffice",
  guestBedroom: "GuestBedroom",
  window: "Window",
  flooring: "Flooring",
  wallDecor: "WallDecor",
  wallPaint: "WallPaint",
  homeWallpaper: "HomeWallpaper",
  tile: "Tile",
  studyroom: "StudyRoom",
  kitchenSinks: "KitchenSinks",
  spaceSavingDesign: "spaceSavingDesign",
  door: "Door",
  staircase: "Staircase",
  crockeryUnit: "crockeryUnit",
  homeBar: "homeBar"
};


  const cityMap = {
    saran: "city1",
    patna: "city2",
    vijyawada: "city3",
    kanpur: "city4",
    goa: "city5",
    dehradun: "city6",
    agra: "city7",
    surat: "city8"
  }

  const furnitureMap = {
    sofasAndSofaBed: "sofasAndSofaBed",
    diningTableAndSets:"diningTableAndSets",
    tables: "tables",
    occasionalSeating: "occasionalSeating"
  }

  const pageKey = apiMap[designType];
  const cityKey = cityMap[designType];
  const furnitureKey = furnitureMap[designType];

  // DESIGN PAGE
  if (pageKey) {
    return (
  <Template
    pageKey={pageKey}
    imageFolder={designFolderMap[designType]}
    onQuoteClick={onQuoteClick}
  />
);
  }

  // CITY PAGE
  if (cityKey) {
    return <TemplateForCities cityKey={cityKey} />;
  }

  // FURNITURE PAGE
  if (furnitureKey) {
    return <Furniture furnitureKey={furnitureKey} />;
  }

  // INVALID ROUTE
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Page not found</h2>
    </div>
  );

};

export default SecondFront;
