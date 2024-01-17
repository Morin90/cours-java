async function getPosts() {
    const reponse = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100')
    const data = await reponse.json()
    return data
    }

    function getIdByPosts(posts){
        let ids = []
        posts.forEach(function(post){
            if(!ids.includes(post.userId)){
                ids.push(post.userId)
            }
        });
        return ids
    }

    async function getAuthors(ids) {
        const authors = []
        for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const data = await reponse.json()
        authors.push(data)
        }
        return authors
        }

        async function getCommentLength(posts) {
            const nombreCommentaire = {}
            for (let index = 0; index < posts.length; index++) {
            const post = posts[index];
            const reponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
            const data = await reponse.json()
            nombreCommentaire[post.id] = data.length
            }
            return nombreCommentaire
            }
            


            function modifNomTitreBody(posts, authors){
                for(let i=0; i<posts.length; i++){
                const divPost = document.getElementById('posts-container')
                const template = document.getElementById('temp')
                const h2= template.content.cloneNode(true)
                const tdiv = h2.querySelector('.pMail')
                const tdiv1 = h2.querySelector('.titre')
                const tdiv2 = h2.querySelector('.pDuPost')
                const tdiv3 = h2.querySelector('.avatar')
                const auteur = authors.filter(function(element){  
                return posts[i].userId == element.id
                })
                
                tdiv.textContent = '@' + auteur[0].name
                tdiv1.textContent = posts[i].title
                tdiv2.textContent = posts[i].body
                tdiv3.src = `https://ui-avatars.com/api/?name=${auteur[0].name}&background=random`
                divPost.appendChild(h2)
                console.log(auteur)
                }
            }
            
            
async function main() {
    const posts = await getPosts()
    console.log(posts);
    const userIds = getIdByPosts(posts)
    console.log(userIds);
    const authors = await getAuthors(userIds)
    console.log(authors);
    const nbComments = await getCommentLength(posts)
    console.log(nbComments);
    modifNomTitreBody(posts,authors)

    // Récuperer le nom de la personne qui envoie le post
    // Je séléctionne ma div, où on ajoutera la copie de notre template
/*const divPosts = document.getElementById('posts-container')
// Je séléctionne mon template
console.log(divPosts)
const template = document.getElementById('temp')
// Je duplique le contenu de mon template
const h2= template.content.cloneNode(true)
// Je séléctionne les champs de mon template
const tdiv = h2.querySelector('.pMail')
// Je modifie les champs
 tdiv.textContent = '@' + authors[0].name
 // J'ajoute à mon tableau le contenu modifié du template
 divPosts.appendChild(h2)

//je recupere les titres de posts
const divPost = document.getElementById('posts-container')
// Je séléctionne mon template
console.log(divPost)
const templat = document.getElementById('temp')
// Je duplique le contenu de mon template
const p= templat.content.cloneNode(true)
// Je séléctionne les champs de mon template
const tdiv1 = p.querySelector('.titre')
// Je modifie les champs
 tdiv1.textContent = posts[0].title
 // J'ajoute à mon tableau le contenu modifié du template
 divPost.appendChild(p)

 // je recupere le body(le text du post)
 const divPos = document.getElementById('posts-container')
 // Je séléctionne mon template
 console.log(divPost)
 const templa = document.getElementById('temp')
 // Je duplique le contenu de mon template
 const pPoste= templa.content.cloneNode(true)
 // Je séléctionne les champs de mon template
 const tdiv2 = pPoste.querySelector('.pDuPost')
 // Je modifie les champs
  tdiv2.textContent = posts[0].body
  // J'ajoute à mon tableau le contenu modifié du template
  divPos.appendChild(pPoste)*/


}
    
    main()

    console.log(main())

