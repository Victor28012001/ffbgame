import { lazy } from "react";

const Home = lazy(() => import("../pages/index"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Profile = lazy(() => import("../pages/Profile"));
const Purchase = lazy(() => import("../pages/Purchase"));
const Characters = lazy(() => import("../pages/Characters"));
const Arena = lazy(() => import("../pages/Arena"));
const Strategy = lazy(() => import("../pages/Strategy"));
const WarriorsSelection = lazy(() => import("../pages/Warriors"));
const MarketPlace = lazy(() => import("../pages/MarketPlace"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Duels = lazy(() => import("../pages/Duels"));
const JoinDuel = lazy(() => import("../pages/JoinDuel"));
const AIduel = lazy(() => import("../pages/Aiduel"));
const UserActivity = lazy(() => import("../pages/userTx"));
const CreateCharacter = lazy(() => import("../pages/CreateCharacter"));
const Chat = lazy(() => import("../pages/Chat"));
const Main = lazy(() => import("../main"));
// import {Main} from '../main'
const WhitePaper = lazy(() => import("../components/WhitePaper"))

type Route = {
  path: string;
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};
type coreRoutes = Route[];

const coreRoutes: coreRoutes = [
  {
    path: "/",
    title: "Main",
    component: Main,
  },
  {
    path: "/whitepaper",
    title: "WhitePaper",
    component: WhitePaper,
  },
  {
    path: "/Home",
    title: "Home",
    component: Home,
  },
  {
    path: "/chat",
    title: "Chat",
    component: Chat,
  },
  {
    path: "/about",
    title: "About",
    component: About,
  },
  {
    path: "/aiduel",
    title: "AI Duel",
    component: AIduel,
  },
  {
    path: "/contact",
    title: "Contact",
    component: Contact,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/profile/useractivity",
    title: "Assets Manager",
    component: UserActivity,
  },
  {
    path: "/profile/purchasecharacter",
    title: "Purchase Character",
    component: Purchase,
  },
  {
    path: "/profile/yourcharacters",
    title: "Your Characters",
    component: Characters,
  },
  {
    path: "/profile/createcharacter",
    title: "Create Character",
    component: CreateCharacter,
  },
  {
    path: "/arena",
    title: "Arena",
    component: Arena,
  },
  {
    path: "/joinduel/:duelId",
    title: "Joinduel",
    component: JoinDuel,
  },
  {
    path: "/duels",
    title: "Duels",
    component: Duels,
  },
  {
    path: "/duels/:duelId",
    title: "Duel",
    component: Arena,
  },
  {
    path: "/strategy/:duelId",
    title: "Strategy",
    component: Strategy,
  },
  {
    path: "/selectWarriors",
    title: "Warriors",
    component: WarriorsSelection,
  },
  {
    path: "/marketplace",
    title: "Marketplace",
    component: MarketPlace,
  },
  {
    path: "/characters",
    title: "Characters",
    component: Characters,
  },
  {
    path: "/marketplace/:id",
    title: "Product Detail",
    component: ProductDetail,
  },
];

const routes = [...coreRoutes];
export default routes;
