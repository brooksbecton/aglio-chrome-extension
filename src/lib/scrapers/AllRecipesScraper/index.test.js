import AllRecipesScraper from "./index";

describe("AllRecipesScraper", () => {
  it("pulls recipe steps", () => {
    /**
     * This HTML string follows the same structure as allrecipes page
     * But it's recipe steps are "Add Salt, Add Pepper, and Bake"
     */
    document.body.innerHTML = `<ol class="list-numbers recipe-directions__list"itemprop=recipeInstructions><li class=step ng-class="{'finished': stepIsActive0}"ng-click="stepIsActive0 = !stepIsActive0"><span class=recipe-directions__list--item>Add Salt</span><li class=step ng-class="{'finished': stepIsActive1}"ng-click="stepIsActive1 = !stepIsActive1"><span class=recipe-directions__list--item>Add Pepper</span><li class=step ng-class="{'finished': stepIsActive2}"ng-click="stepIsActive2 = !stepIsActive2"><span class=recipe-directions__list--item>Bake</span></ol>`;

    const testScraper = new AllRecipesScraper();
    const steps = testScraper.getRecipe();

    expect(steps).toEqual(["Add Salt", "Add Pepper", "Bake"]);
  });

  it("removes the 'Add all ingredients' li");

  it("pulls ingredients from 1 list", () => {
    /**
     * This HTML string follows the same structure as allrecipes page
     * But it's ingredients are "1 Peanut Butter, 1 Jelly, 1 Bread"
     */
    document.body.innerHTML = `<ul class="checklist dropdownwrapper list-ingredients-1"id=lst_ingredients_1 ng-hide=reloaded><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="1/3 cup plain bread crumbs"><input data-id=2112 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,2112) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=2112 data-nameid=2112 itemprop=ingredients>Add all ingredients to list</span></label><div class=pol-biu-container></div><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="1/2 cup milk"><input data-id=16278 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,16278) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=16278 data-nameid=16278 itemprop=ingredients>1 Jelly</span></label><div class=pol-biu-container></div><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="2 tablespoons olive oil"><input data-id=9725 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,9725) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=9725 data-nameid=9725 itemprop=ingredients>1 Bread</span></label><div class=pol-biu-container></div></ul>`;

    const testScraper = new AllRecipesScraper();
    const ingredients = testScraper.getIngredients();

    expect(ingredients).toEqual(["1 Jelly", "1 Bread"]);
  });

  it("pulls ingredients from more than 1 list", () => {
    // ingredients are "1 Peanut Butter, 1 Jelly, 1 Bread, 1 Peanut Butter, 1 Jelly, 1 Bread"
    document.body.innerHTML = `<ul class="checklist dropdownwrapper list-ingredients-1"id=lst_ingredients_1 ng-hide=reloaded><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="1/3 cup plain bread crumbs"><input data-id=2112 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,2112) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=2112 data-nameid=2112 itemprop=ingredients>1 Peanut Butter</span></label><div class=pol-biu-container></div><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="1/2 cup milk"><input data-id=16278 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,16278) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=16278 data-nameid=16278 itemprop=ingredients>1 Jelly</span></label><div class=pol-biu-container></div><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="2 tablespoons olive oil"><input data-id=9725 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,9725) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=9725 data-nameid=9725 itemprop=ingredients>1 Bread</span></label><div class=pol-biu-container></div></ul><ul class="checklist dropdownwrapper list-ingredients-1"id=lst_ingredients_1 ng-hide=reloaded><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="1/3 cup plain bread crumbs"><input data-id=2112 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,2112) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=2112 data-nameid=2112 itemprop=ingredients>1 Peanut Butter</span></label><div class=pol-biu-container></div><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="1/2 cup milk"><input data-id=16278 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,16278) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=16278 data-nameid=16278 itemprop=ingredients>1 Jelly</span></label><div class=pol-biu-container></div><li class=checkList__line><label class=checkList__item ng-class="{true: 'checkList__item'}[true]"title="2 tablespoons olive oil"><input data-id=9725 data-role=none name=ingredientCheckbox ng-click=saveIngredient($event,9725) type=checkbox value=N> <span class="added recipe-ingred_txt"data-id=9725 data-nameid=9725 itemprop=ingredients>1 Bread</span></label><div class=pol-biu-container></div></ul>`;

    const testScraper = new AllRecipesScraper();
    const ingredients = testScraper.getIngredients();

    expect(ingredients).toEqual([
      "1 Peanut Butter",
      "1 Jelly",
      "1 Bread",
      "1 Peanut Butter",
      "1 Jelly",
      "1 Bread"
    ]);
  });
});
