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
    infosHolder.classList.add('flex', 'flex-column', 'justify-between')
    const typeStackHolder = document.createElement('div');
    typeStackHolder.classList.add('flex');
    typeStackHolder.classList.add('align-center', 'justify-between');
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

    //description
    const descriptionHolder = document.createElement('p');
    descriptionHolder.innerText = projet.description;
    infosHolder.append(descriptionHolder);

    //liens
    const liensHolder = document.createElement('ul');
    liensHolder.classList.add('flex', 'gap-10')
    const projetLiens = projet.liens;
    for (var lien in projetLiens) {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        const iElement = document.createElement('i');
        aElement.innerText = "Voir sur " + lien.toUpperCase();
        aElement.href = projetLiens[lien];
        //1ere loop - projetLiens['youtube'];
        iElement.classList.add('fa-brands', 'fa-' + lien);
        //1ere loop - fa-youtube
        aElement.append(iElement);
        liElement.append(aElement);
        liensHolder.append(liElement);
    }
    infosHolder.append(liensHolder);

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
        // if(projet.colStart) {
        //     cardHolder.classList.add('col-start-' + projet.colStart);
        // }
        // if (projet.colSpan) {
        //     cardHolder.classList.add('col-span-' + projet.colSpan);
        // }
        // if (projet.rowStart) {
        //     cardHolder.classList.add('row-start-' + projet.rowStart);
        // }
        // if (projet.rowSpan) {
        //     cardHolder.classList.add('row-span-' + (projet.rowSpan));
        // }
        if (projet.gridArea) {
            cardHolder.classList.add('tuile-' + projet.gridArea);
        }

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
