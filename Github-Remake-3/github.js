require('dotenv').config();
// const config = require('./config.json');
const token = process.env.GITHUB_TOKEN;


const query = {
  query: `
  query{

    user(login: "rome-flp"){
    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC,}) {
      nodes {
          id,
          url,
        name,
       isPrivate,
       resourcePath,
       description,
       primaryLanguage
       {
           name,
           color,
       }
       languages(first: 10){
         nodes{
           name,
           color
         }
       }
       parent{
         name,
         nameWithOwner,
         forkCount
       }
       forkCount
 forks(
   first: 12
   orderBy: { field: NAME, direction: DESC }
 ) {
   totalCount}
     stargazerCount
       updatedAt,
       
      }
    }
  }
}

            `,
};

async function getRepos() {

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
  });
  const json = await response.json();
  const repository = json.data.user.repositories.nodes;
  console.log(repository);

  const ulElement = document.querySelector(".unordered-list");

  createRepositories = (repository) => {

    const date = new Date(repository.updatedAt);

    const updatedAtDate = date.toLocaleString("default", { month: "short" }) + " " + date.getDate();

    const listOne = document.createElement("li");

    listOne.classList.add("border-bottom", "repo-li");

    const repoDetailsDiv = document.createElement("div");

    repoDetailsDiv.classList.add("repo-details");

    listOne.appendChild(repoDetailsDiv);

    const createTitle = document.createElement("a");

    createTitle.classList.add("title");

    createTitle.innerHTML = repository.name;

    createTitle.setAttribute("href", "repository.url");

    repoDetailsDiv.appendChild(createTitle);

    if (repository.parent != null) {
      const createForkedFromDiv = document.createElement("div");

      createForkedFromDiv.classList.add("forked-from");

      repoDetailsDiv.append(createForkedFromDiv);

      const createForkedFromTextDiv = document.createElement("p");

      createForkedFromTextDiv.innerHTML = "Forked from ";

      createForkedFromDiv.appendChild(createForkedFromTextDiv);

      const createForkedFromLinkDiv = document.createElement("a");

      createForkedFromLinkDiv.classList.add("forked-link", "forked-from-link");

      createForkedFromLinkDiv.setAttribute("href", "repository.resourcePath");

      createForkedFromLinkDiv.innerHTML = repository.parent.nameWithOwner;

      createForkedFromTextDiv.appendChild(createForkedFromLinkDiv);

    }


    const createDescription = document.createElement("div");

    createDescription.classList.add("description");

    repoDetailsDiv.append(createDescription);

    const descriptionText = document.createElement("p");

    descriptionText.innerHTML = repository.description;

    createDescription.appendChild(descriptionText);

    const extraDiv = document.createElement("div");

    extraDiv.classList.add("extra");

    repoDetailsDiv.append(extraDiv);


    if (repository.primaryLanguage != null) {

      const languageDiv = document.createElement("div");

      languageDiv.classList.add("language");

      extraDiv.appendChild(languageDiv);

      const languageSvg = document.createElement("span");

      languageSvg.setAttribute("id", "svg-color");

      languageSvg.classList.add("language-svg", "icon-margin-small");

      languageDiv.appendChild(languageSvg);

      languageSvg.style.backgroundColor = repository.primaryLanguage.color;

      const languageNameSpan = document.createElement("span");

      languageNameSpan.innerHTML = repository.primaryLanguage.name;

      languageDiv.append(languageNameSpan);
    }

    if (repository.parent != null || repository.stargazerCount > 0) {

      const createNumberOfForksDiv = document.createElement("div");

      createNumberOfForksDiv.classList.add("forks");

      extraDiv.append(createNumberOfForksDiv);

      const forksCountLink = document.createElement("a");

      forksCountLink.classList.add("fork-count", "forked-from-link");

      createNumberOfForksDiv.appendChild(forksCountLink);

      const forkSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );

      forkSvg.classList.add("star-button-svg");

      forkSvg.setAttribute("view-box", "0 0 16 16");

      forkSvg.setAttribute("version", "1.1");

      forkSvg.setAttribute("width", "16");

      forkSvg.setAttribute("height", "16");

      forkSvg.setAttribute("role", "img");

      const svgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      svgPath.setAttribute("fill-rule", "evenodd");

      svgPath.setAttribute(
        "d",
        "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
      );

      forkSvg.appendChild(svgPath);

      forksCountLink.appendChild(forkSvg);

      const numberOfForksSpan = document.createElement("span");

      numberOfForksSpan.innerHTML = repository.parent.forkCount;

      forksCountLink.append(numberOfForksSpan);

    }

    const updateDiv = document.createElement("div");

    updateDiv.classList.add("date");

    extraDiv.append(updateDiv);

    const updateInnerHtml = document.createElement("span");

    updateInnerHtml.innerHTML = "Updated on ";

    updateDiv.appendChild(updateInnerHtml);

    const dateSpan = document.createElement("span");

    dateSpan.classList.add("update");

    dateSpan.innerHTML = updatedAtDate;

    updateDiv.append(dateSpan);

    const createStarButtonDiv = document.createElement("div");

    createStarButtonDiv.classList.add("star-button");

    listOne.append(createStarButtonDiv);

    const starButton = document.createElement("button");

    starButton.classList.add("button");

    const starSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    starSvg.classList.add("star-button-svg", "icon-margin-small");

    starSvg.setAttribute("height", "16");

    starSvg.setAttribute("width", "16");

    starSvg.setAttribute("version", "1.1");

    starSvg.setAttribute("viewBox", "0 0 16 16");

    starSvg.setAttribute("aria-hidden", "true");

    starButton.appendChild(starSvg);

    const starSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    starSvgPath.setAttribute("fill-rule", "evenodd");

    starSvgPath.setAttribute(
      "d",
      "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
    );

    starSvg.appendChild(starSvgPath);

    const starTextSpan = document.createElement("span");

    starTextSpan.innerHTML = "Star";

    starButton.appendChild(starTextSpan);

    createStarButtonDiv.appendChild(starButton);

    ulElement.appendChild(listOne);
  };

  repository.map(createRepositories);
}

getRepos();



function myFunction() {
  var x = document.getElementById("nav-links");

  x.classList.toggle('active');
}


function mySecondFunction() {
  var x = document.getElementById("plus-drop-down");

  x.classList.toggle('active');
}


function myThirdFunction() {
  var x = document.getElementById("profile-drop");

  x.classList.toggle('active');
}


function myFourthFunction() {
  var x = document.getElementById("type-dropdown");

  x.classList.toggle('active');
}

function myFifthFunction() {
  var x = document.getElementById("language-dropdown");

  x.classList.toggle('active');
}


window.onscroll = function () { myScrollFunction() };

var navbar = document.getElementById("navbar-stick");

var sticky = navbar.offsetTop;

function myScrollFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


