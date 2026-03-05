const card_container = document.querySelector(".cards")
const add_btn = document.querySelector(".add-btn")
async function loadProjects() {
    let projects = localStorage.getItem("projects")
    if(!projects){
        const response = await fetch("db.json")
        projects = await response.json()
        localStorage.setItem("projects", JSON.stringify(projects))
    }else {
        projects = JSON.parse(projects);
    }
    renderCards(projects)
}
function renderCards(projects){
    card_container.innerHTML = ""
    projects.forEach(project => {
        const fragment = document.createDocumentFragment()
        const wrapper = document.createElement("div")
        wrapper.innerHTML = `
            <div class="card">
            <h2 class="name-text">${project.name}</h2>
            <p class="desc-text">Описание: ${project.description}</p>
            <p class="author-text">Автор: ${project.author}</p>
            <p class="status-text">Статус: ${project.status}</p>
            <div class="likes">
                <p class="like-count" id="${project.id}">${project.likesCount} всего голосов</p>
                <p class="btn" onclick="likeProject(${project.id})">Нравится❤️</p>
            </div>
        </div>`
        fragment.appendChild(wrapper)
        card_container.appendChild(fragment)
    });
}
function likeProject(id){
    if(sessionStorage.getItem("liked_" + id)){
        alert("Вы уже голосовали за этот проект!")
        return
    }
    let projects = JSON.parse(localStorage.getItem("projects"))
    projects.forEach(project => {
        if(project.id === id){
            project.likesCount++
        }
    });
    localStorage.setItem("projects", JSON.stringify(projects))
    sessionStorage.setItem("liked_" + id, "true")
    renderCards(projects)
}
add_btn.addEventListener("click", function(){
    addProject()
})
function addProject(){
    const name_input = document.querySelector("#name").value
    const desc_input = document.querySelector("#desc").value
    const author_input = document.querySelector("#author").value
    const status_input = document.querySelector("#status").value
    if(name_input === "" || desc_input === "" || author_input === "" || status_input === ""){
        alert("Заполните все поля перед отправкой!")
        return
    }
    const input_form = document.querySelector(".add-projects")
    let projects = JSON.parse(localStorage.getItem("projects"))
    const newProject = {
        id: Date.now(),
        name: name_input,
        description: desc_input,
        author: author_input,
        status: status_input,
        likesCount: 0
    }
    projects.push(newProject)
    localStorage.setItem("projects", JSON.stringify(projects))
    renderCards(projects)
    input_form.reset()
}
loadProjects()