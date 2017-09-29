import App from './components/App';
import Home from './components/home/Home';
import Spins from './components/spins/Spins';
import Components from './components/components/Components';
import Reels from './components/reels/Reels';
import Recipes from './components/recipes/Recipes';
import Weightings from './components/weightings/Weightings';

const routes = [
  { 
    component: App,
    routes: [
      { 
        path: '/app',
        component: Home,
      },
      { 
        path: '/spins',
        component: Spins,
      },
      { 
        path: '/components',
        component: Components,
      },
      { 
        path: '/reels',
        component: Reels,
      },
      { 
        path: '/recipes',
        component: Recipes,
      },
      { 
        path: '/weightings',
        component: Weightings,
      },
      { 
        path: '/',
        component: Home,
      },
    ]
  }
];

export default routes;