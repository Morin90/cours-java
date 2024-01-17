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

        async function getComment(postsId) {
            const reponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postsId}/comments`)
            const data = await reponse.json()
            return data
            }
            
            async function modifNomTitreBody(post){
                
                for(let i=0; i<post.length; i++){

                const divPost = document.getElementById('posts-container')
                const template = document.getElementById('temp')
                const h2= template.content.cloneNode(true)
                const tdivId = h2.querySelector('.post')
                const tdiv = h2.querySelector('.pMail')
                const tdiv1 = h2.querySelector('.titre')
                const tdiv2 = h2.querySelector('.pDuPost')
                const tdiv3 = h2.querySelector('.avatar')
                const commentsElement = h2.querySelector('.post-comment-nb')
                const comments = h2.querySelector('.comments')
                tdivId.id = `post-${post[i].id}`
                tdiv.textContent = '@' + post[i].author.name
                tdiv1.textContent = post[i].title
                tdiv2.textContent = post[i].body
                tdiv3.src = `https://ui-avatars.com/api/?name=${post[i].author.name}&background=random`
                commentsElement.textContent = `${post[i].comments.length}` + "  " + "commentaire(s)"
                tdivId.addEventListener('click', function(){
                    toggleComments(`post-${post[i].id}`)
                })

                const bodyCom = post[i].comments
                let b = 1
                bodyCom.forEach(function(com){
                    comments.innerHTML += `<img class = 'avatar ' src = 'https://ui-avatars.com/api/?name=${com.email}&background=random'></p>`
                    
                    comments.innerHTML += `<p > ${b} :  ${com.body} </p>`

                    comments.innerHTML += `<p style="color : blue"> ${com.email}</p>`

                    b++
                })
                
                divPost.appendChild(h2)
                
                }
            
                
            }
        
            
async function main() {
    let posts = await getPosts()
    const userIds = getIdByPosts(posts)
    const authors = await getAuthors(userIds)
    const nbComments = await getComment(posts)

    posts = posts.map(function(post){
        const author = authors.find(function(auteur){
            return auteur.id === post.userId
        })
        post.author = author
    return post
})
    for ( let index = 0; index<posts.length; index++){
        let post = posts[index];
        posts[index].comments = await getComment(post.id)
    
}
    modifNomTitreBody(posts)



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
//function pour cliquer et afficher les commentaires
    function toggleComments(postId){
        let x = document.getElementById(postId)
        let y = x.children[4]
        y.classList.toggle(`hide`)
    }

