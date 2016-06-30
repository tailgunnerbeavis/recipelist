/**
 * Mocking client-server processing
 */
import _recipes from './recipes.json';

const TIMEOUT = 100;

export default {
  getRecipes(cb, timeout) {
    setTimeout(() => cb(_recipes), timeout || TIMEOUT)
  }
};