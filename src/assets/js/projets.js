import projets from "../data/projets.json";

const generateModalContent = (projet) => {
    const holder = document.querySelector('.modale-holder');
    const contenuHolder = document.querySelector('.modale-contenu');
    const closeBtn = document.querySelector('[data-modal-close]');

    const header = holder.querySelector('header');
    
    if (header.querySelector('h2')) {
        header.querySelector('h2').remove();
    }

    const title = document.createElement('h2');
    title.innerText = projet.name;
    header.prepend(title);

    contenuHolder.innerHTML = "";

    const img = document.createElement('img');
    img.src = projet.img;
    img.alt = projet.imgAlt;
    contenuHolder.append(img);

    const infosHolder = document.createElement('div');
    const typeStackHolder = document.createElement('div');
    typeStackHolder.classList.add('flex');
    const typeP = document.createElement('p');
    typeP.innerText = projet.type;
    typeStackHolder.append(typeP);
    const stackHolder = document.createElement('ul');
    const stackItems = projet.stack;
    stackItems.forEach(item => {
        const liElement = document.createElement('li');
        liElement.innerText = item;
        stackHolder.append(liElement);
    })
    typeStackHolder.append(stackHolder);
    infosHolder.append(typeStackHolder);
    contenuHolder.append(infosHolder);

    //montrer la modale
    holder.classList.remove('hidden');

    //fermeture modale
    closeBtn.addEventListener('click', () => {
        holder.classList.add('hidden');
    })
}

const generateProjectsList = () => {
    const holder = document.querySelector('.projets-holder');

    projets.forEach(projet => {
        const cardHolder = document.createElement('div');

        const header = document.createElement('header');
        const title = document.createElement('h2');
        title.innerText = projet.name;
        header.append(title);
        cardHolder.append(header);

        const img = document.createElement('img');
        img.src = projet.img;
        img.alt = projet.imgAlt;
        // img.setAttribute('src', projet.img);
        // img.setAttribute('alt', projet.imgAlt);
        cardHolder.append(img);

        const typeP = document.createElement('p');
        typeP.innerText = projet.type;
        cardHolder.append(typeP);

        const modalBtn = document.createElement('button');
        modalBtn.innerText = "En savoir plus";
        modalBtn.setAttribute('aria-label', modalBtn.innerText + " - " + projet.name);
        cardHolder.append(modalBtn);
        modalBtn.addEventListener('click', () => {
            generateModalContent(projet);
        })

        holder.append(cardHolder);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    generateProjectsList();
})
