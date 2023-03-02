import { Activity } from "../../model/activity/Activity";
import { Cities } from "../cities/Cities";

export const HarryPotterStudioAct = {
  id: "HarPot1",
  city: Cities.London,
  title: "Harry Potter studio",
  durationInHour: 4,
  priceEuro: 50,
  description:
    "Venez vous imerger dans les studios du célèbre sorcier Harry Potter." +
    "The Making of Harry Potter - Studio Tour London est un studio de cinéma ouvert au public et situé à Leavesden, dans le sud-est de l'Angleterre. Il s'agit d'une exposition permanente offrant un aperçu des coulisses des films Harry Potter. Il est situé à l'intérieur des Studios de Leavesden, près de Watford, dans le sud-ouest du comté de Hertford (à une trentaine de kilomètres de Londres). Les studios étant encore très actifs, l'exposition est contenue dans deux plateaux séparés du reste du complexe. L'exposition est accessible aux voyageurs venant de la ville, ou du reste du pays, grâce à ses jonctions avec la gare de Watford et aux autoroutes M1 et M25.  The Making of Harry Potter est ouvert au public depuis 2012 et accueille plus de 6 000 visiteurs par jour. Actuellement, toute l'attraction est consacrée à Harry Potter et permet aux fans de découvrir de près les décors, costumes, objets ayant été utilisés pour les films de la série, sur un circuit de visite d'une durée moyenne de trois heures trente",
} as Activity;
