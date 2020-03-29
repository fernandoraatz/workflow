/*
|--------------------------------------------------------------------------
| Rxjs
|--------------------------------------------------------------------------
*/

const API_URL =  'https://api.github.com/search/repositories?q='


class Github {

	constructor(){
		this.search = document.querySelector('#search');
		this.search$ = Rx.Observable.fromEvent(this.search, 'keyup');
	}

	init(){

		this.search$
			.debounce(()=> Rx.Observable.interval(500))
			.map(event => event.target.value)
			.filter(text => text.length > 2) 
			.subscribe(this.searchProjects)

	} 

	searchProjects(projectName) {

		let projectsList = new Rx.BehaviorSubject([]);
		let target = document.querySelector('#projects-list');

		Rx.Observable
			.fromPromise(fetch(`${API_URL}${projectName}`))
			.subscribe(response => {
				response
					.json()
					.then(result => result.items) 
					.then(itemsList => projectsList.next(itemsList) )
			})

			projectsList.subscribe(projects => {
				var template = '';
				projects.forEach(project => {
					template += `
						<li class="project-list-item" >
							<img class="project-owner-avatar" src="${project.owner.avatar_url}" />
							<div class="project-info" >
								<b>${project.owner.login}</b>
								/ ${project.name}
							</div>
							<div class="project-info" >
								Forks: ${project.forks}
							</div>
						</li>
					`;
				})
				target.innerHTML = `<ul class="project-list" >${template}</ul>`
			})
	}

	


}


let github = new Github()
github.init();






