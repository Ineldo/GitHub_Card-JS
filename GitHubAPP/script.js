const API_URL = 'https://api.github.com/users/'
const main= document.getElementById('main');
const form= document.getElementById('form');
const search= document.getElementById('search');



async function getUser(username){
    const resp = await fetch(API_URL + username );
    const respData = await resp.json(); 

    createUserCard(respData);
    getRepos(username);

}

async function getRepos(username){
  const resp = await fetch(API_URL + username + '/repos' );
  const respData = await resp.json(); 


  addRespostCard(respData);
  
}

function createUserCard(user){
  

    const cardHTML= `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}"
             alt="${user.name}"/>
        </div>
        <div class="userInfo">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>${user.followers}</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
              </svg>${user.following}</li>
                <li><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>${user.public_repos}</li>
            </ul>
            <h5>Repos:</h5>
            <div id="repos">
            </div>
        </div>
    </div>
    `;

 

    main.innerHTML= cardHTML;

}

function addRespostCard(repos){
  const reposEl= document.getElementById('repos');

  repos.sort((a, b)=> b.stargazers_count - a.stargazers_count).slice(0 , 9).forEach(repo => {
    const repoEl = document.createElement('a');

    repoEl.classList.add('repo');

    repoEl.href = repo.html_url;
    repoEl.target = "_blank"
    repoEl.innerText = repo.name;  

    reposEl.appendChild(repoEl);
  });
}


form.addEventListener("submit", (e)=> {
   e.preventDefault();
   
   const user = search.value;

   if(user) {
       getUser(user);

       search.value = "";
   }
});