function goIntoView (id) {
    const section = document.querySelector(`#${id}`);
    section.scrollIntoView({behavior: "smooth"});
}