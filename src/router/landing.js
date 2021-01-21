import LandingDemo from '../components/Landing/Demo';
import LandingFeatures from '../components/Landing/Features';
import LandingWorks from '../components/Landing/Works';
import LandingPricing from '../components/Landing/Pricing';
import LandingHome from '../components/Landing/Home';

const landing = [
  {
    path: 'landing-home',
    name: 'landing-home',
    component: LandingHome
  },
  {
    path: 'landing-demo',
    name: 'landing-demo',
    component: LandingDemo
  },
  {
    path: 'landing-features',
    name: 'landing-features',
    component: LandingFeatures
  },
  {
    path: 'landing-works',
    name: 'landing-works',
    component: LandingWorks
  },
  {
    path: 'landing-pricing',
    name: 'landing-pricing',
    component: LandingPricing
  }
];

export default landing;
