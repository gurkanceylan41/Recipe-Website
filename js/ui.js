import { elements } from "./helpers.js";

export const renderResult = (recipe) => {
  elements.resultsList.innerHTML = "";
  recipe.slice(0, 10).forEach((recipe) => {
    const markup = `

      <a href="#${recipe.id}" class="result-link">
            <img src="${recipe.image_url}" width="50" alt="" />
            <div class="data">
            <h4>${recipe.title}</h4>
            <p>${recipe.publisher}</p>
            </div>
      </a>
      
      `;
    //oluşturdugumuz htmli ilgili yere gönderme
    elements.resultsList.insertAdjacentHTML("beforeend", markup);
  });
};
export const renderLoader = (parent) => {
  parent.innetHTML = "";
  const loader = ` 

  <div class="loader">
  <img src="./../images/foodGif.gif"/>
  <div>
  
  `;

  //loaderı bize gelen html elemanın içerisine gönderme
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const renderBasketItems = (items) => {
  const markup = items
    .map(
      (item) =>
        `
    <li data-id= ${item.id}>
        <i class="bi bi-x" id="delete-item"></i>
        <span>${item.title.description}</span>
    </li>
  
  
  `
    )
    .join("");
  elements.basketList.innerHTML = markup;
};
